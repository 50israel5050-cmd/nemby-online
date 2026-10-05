import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Search, 
  Plus, 
  Trash2, 
  Download, 
  Printer, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  Laptop, 
  Maximize2, 
  Minimize2, 
  X,
  FileSpreadsheet
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { InventoryItem } from '../types';

const INITIAL_ITEMS: InventoryItem[] = [
  { id: '101', name: 'מחשב נייד Pro 15.6"', category: 'חומרה', price: 4200, stock: 14, status: 'available', lastUpdated: 'היום 10:30' },
  { id: '102', name: 'עכבר ארגונומי אלחוטי', category: 'ציוד היקפי', price: 180, stock: 4, status: 'low_stock', lastUpdated: 'היום 09:15' },
  { id: '103', name: 'מקלדת מכנית RGB', category: 'ציוד היקפי', price: 350, stock: 22, status: 'available', lastUpdated: 'אתמול' },
  { id: '104', name: 'מסך 27 אינץ׳ 4K IPS', category: 'מסכים', price: 1650, stock: 2, status: 'low_stock', lastUpdated: 'היום 11:00' },
  { id: '105', name: 'כבל HDMI 2.1 מסוכך', category: 'כבלים', price: 65, stock: 0, status: 'out_of_stock', lastUpdated: 'לפני יומיים' },
  { id: '106', name: 'אוזניות בידוד רעשים', category: 'אודיו', price: 590, stock: 8, status: 'available', lastUpdated: 'אתמול' }
];

export const LiveDesktopDemo: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('demo_desktop_items');
    return saved ? JSON.parse(saved) : INITIAL_ITEMS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAdding, setIsAdding] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // New item form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemCat, setNewItemCat] = useState('חומרה');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemStock, setNewItemStock] = useState('');

  useEffect(() => {
    localStorage.setItem('demo_desktop_items', JSON.stringify(items));
  }, [items]);

  const categories = ['all', 'חומרה', 'ציוד היקפי', 'מסכים', 'כבלים', 'אודיו'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalValue = items.reduce((acc, item) => acc + (item.price * item.stock), 0);
  const totalItemsCount = items.reduce((acc, item) => acc + item.stock, 0);
  const lowStockCount = items.filter(item => item.stock <= 5).length;

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice || !newItemStock) return;

    const price = parseFloat(newItemPrice);
    const stock = parseInt(newItemStock, 10);
    const newItem: InventoryItem = {
      id: Math.floor(100 + Math.random() * 900).toString(),
      name: newItemName,
      category: newItemCat,
      price,
      stock,
      status: stock === 0 ? 'out_of_stock' : stock <= 5 ? 'low_stock' : 'available',
      lastUpdated: 'כרגע'
    };

    setItems([newItem, ...items]);
    setNewItemName('');
    setNewItemPrice('');
    setNewItemStock('');
    setIsAdding(false);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleExportCSV = () => {
    const headers = 'מק"ט,שם מוצר,קטגוריה,מחיר (₪),כמות במלאי,סטטוס\n';
    const rows = items.map(i => `"${i.id}","${i.name}","${i.category}","${i.price}","${i.stock}","${i.status}"`).join('\n');
    const blob = new Blob(['\uFEFF' + headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `inventory_report_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleResetDemo = () => {
    setItems(INITIAL_ITEMS);
    localStorage.removeItem('demo_desktop_items');
  };

  return (
    <div className={`transition-all duration-300 ${isMaximized ? 'fixed inset-4 z-50 shadow-2xl' : 'w-full'}`}>
      {/* Desktop Window Container */}
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full ring-1 ring-white/10">
        
        {/* Window Title Bar */}
        <div className="bg-slate-800/90 border-b border-slate-700/80 px-4 py-2.5 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block hover:opacity-80 cursor-pointer"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block hover:opacity-80 cursor-pointer"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block hover:opacity-80 cursor-pointer"></span>
            <span className="text-xs text-slate-400 font-mono mr-3 pr-3 border-r border-slate-700 flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-indigo-400" />
              <span>DesktopApp v2.1 • ניהול מלאי ועסקים (פעיל במחשב)</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              אופליין / זיכרון מקומי שמור
            </span>
            <button 
              onClick={() => setIsMaximized(!isMaximized)} 
              title={isMaximized ? "הקטן חלון" : "הגדל חלון"}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Software Top Actions Toolbar */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              הוסף פריט חדש
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              title="מייצא קובץ אקסל אמיתי לכונן המחשב שלך"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              ייצא ל-Excel / CSV
            </button>

            <button
              onClick={() => window.print()}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-sky-400" />
              הדפסה
            </button>

            <button
              onClick={handleResetDemo}
              className="px-2.5 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs flex items-center gap-1 transition-all cursor-pointer"
              title="איפוס נתוני הדגמה"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-4 text-xs">
            <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 flex items-center gap-2">
              <span className="text-slate-400">שווי מלאי:</span>
              <span className="font-bold text-emerald-400 font-mono">₪{totalValue.toLocaleString()}</span>
            </div>
            <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 flex items-center gap-2">
              <span className="text-slate-400">כמות יחידות:</span>
              <span className="font-bold text-indigo-300 font-mono">{totalItemsCount}</span>
            </div>
            {lowStockCount > 0 && (
              <div className="bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/30 flex items-center gap-1.5 text-amber-300">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{lowStockCount} במלאי נמוך</span>
              </div>
            )}
          </div>
        </div>

        {/* Add Item Modal / Collapsible Section */}
        {isAdding && (
          <form onSubmit={handleAddItem} className="p-4 bg-indigo-950/40 border-b border-indigo-900/60 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                <Package className="w-4 h-4" />
                הזנת פריט חדש למערכת המחשב
              </h4>
              <button 
                type="button" 
                onClick={() => setIsAdding(false)} 
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">שם המוצר</label>
                <input
                  type="text"
                  required
                  placeholder="לדוגמה: אוזניות בלוטוס"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">קטגוריה</label>
                <select
                  value={newItemCat}
                  onChange={(e) => setNewItemCat(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="חומרה">חומרה</option>
                  <option value="ציוד היקפי">ציוד היקפי</option>
                  <option value="מסכים">מסכים</option>
                  <option value="אודיו">אודיו</option>
                  <option value="כבלים">כבלים</option>
                  <option value="כללי">כללי</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">מחיר ליחידה (₪)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  required
                  placeholder="250"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">כמות יחידות</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    required
                    placeholder="10"
                    value={newItemStock}
                    onChange={(e) => setNewItemStock(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shrink-0 cursor-pointer"
                  >
                    שמור
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Filter and Search Bar */}
        <div className="p-3 bg-slate-900/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="חיפוש לפי שם פריט או מק״ט..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg pr-9 pl-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto py-0.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat === 'all' ? 'הכל' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Table */}
        <div className="flex-1 overflow-auto max-h-[380px]">
          <table className="w-full text-right text-xs border-collapse">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 border-b border-slate-800 sticky top-0 backdrop-blur-sm z-10">
                <th className="py-2.5 px-4 font-semibold">מק״ט</th>
                <th className="py-2.5 px-4 font-semibold">שם מוצר</th>
                <th className="py-2.5 px-4 font-semibold">קטגוריה</th>
                <th className="py-2.5 px-4 font-semibold">מחיר</th>
                <th className="py-2.5 px-4 font-semibold">מלאי</th>
                <th className="py-2.5 px-4 font-semibold">סטטוס</th>
                <th className="py-2.5 px-4 font-semibold text-center">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">
                    לא נמצאו פריטים התואמים לחיפוש
                  </td>
                </tr>
              ) : (
                filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors group">
                    <td className="py-2.5 px-4 font-mono text-slate-400 font-medium">#{item.id}</td>
                    <td className="py-2.5 px-4 font-medium text-slate-200">{item.name}</td>
                    <td className="py-2.5 px-4 text-slate-400">{item.category}</td>
                    <td className="py-2.5 px-4 font-mono font-semibold text-slate-100">₪{item.price.toLocaleString()}</td>
                    <td className="py-2.5 px-4 font-mono">
                      <span className={item.stock === 0 ? 'text-rose-400 font-bold' : item.stock <= 5 ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                        {item.stock} יח׳
                      </span>
                    </td>
                    <td className="py-2.5 px-4">
                      {item.stock === 0 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                          אזל מהמלאי
                        </span>
                      ) : item.stock <= 5 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          מלאי נמוך ({item.stock})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          תקין במלאי
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="מחק פריט"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Status Bar footer */}
        <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 select-none">
          <div className="flex items-center gap-3">
            <span>מוצגים {filteredItems.length} מתוך {items.length} רשומות</span>
            <span>•</span>
            <span>חיבור מקומי תקין (SQLite/LocalDB Ready)</span>
          </div>
          <div className="flex items-center gap-2 text-indigo-400">
            <span>⚡ מותאם להמרה ישירה ל-Windows (.exe) ול-Mac (.dmg)</span>
          </div>
        </div>

      </div>
    </div>
  );
};

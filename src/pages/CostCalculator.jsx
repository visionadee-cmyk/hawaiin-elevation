import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, ShoppingCart, Package, Save, FileText, Trash2, Plus, Truck, Utensils, Percent } from 'lucide-react';

export default function CostCalculator() {
  const [items, setItems] = useState([]);
  const [profitPercentage, setProfitPercentage] = useState(15);
  const [otherCosts, setOtherCosts] = useState([
    { id: 1, name: 'Transport', amount: 0, unitType: 'total', days: 1, people: 1 },
    { id: 2, name: 'Food', amount: 0, unitType: 'total', days: 1, people: 1 },
    { id: 3, name: 'Accommodation', amount: 0, unitType: 'total', days: 1, people: 1 },
    { id: 4, name: 'Materials', amount: 0, unitType: 'total', days: 1, people: 1 },
    { id: 5, name: 'Other', amount: 0, unitType: 'total', days: 1, people: 1 }
  ]);
  const [savedCalculations, setSavedCalculations] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', unitCost: '', quantity: 1 });

  const addItem = () => {
    if (!newItem.name || !newItem.unitCost) return;
    const item = {
      id: Date.now(),
      name: newItem.name,
      unitCost: parseFloat(newItem.unitCost),
      quantity: parseInt(newItem.quantity) || 1,
      totalCost: parseFloat(newItem.unitCost) * (parseInt(newItem.quantity) || 1)
    };
    setItems([...items, item]);
    setNewItem({ name: '', unitCost: '', quantity: 1 });
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    const updated = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'unitCost' || field === 'quantity') {
          updatedItem.totalCost = (parseFloat(updatedItem.unitCost) || 0) * (parseInt(updatedItem.quantity) || 1);
        }
        return updatedItem;
      }
      return item;
    });
    setItems(updated);
  };

  const updateOtherCost = (id, field, value) => {
    setOtherCosts(otherCosts.map(cost => 
      cost.id === id ? { ...cost, [field]: field === 'amount' ? parseFloat(value) || 0 : value } : cost
    ));
  };

  const calculateCostAmount = (cost) => {
    if (cost.unitType === 'total') {
      return cost.amount;
    } else if (cost.unitType === 'per_day') {
      return cost.amount * cost.days;
    } else if (cost.unitType === 'per_person') {
      return cost.amount * cost.people;
    } else if (cost.unitType === 'per_day_per_person') {
      return cost.amount * cost.days * cost.people;
    }
    return cost.amount;
  };

  const calculations = useMemo(() => {
    const totalItemsCost = items.reduce((sum, item) => sum + item.totalCost, 0);
    const totalOtherCosts = otherCosts.reduce((sum, cost) => sum + calculateCostAmount(cost), 0);
    const subtotal = totalItemsCost + totalOtherCosts;
    const profitAmount = subtotal * (profitPercentage / 100);
    const suggestedBidRate = subtotal + profitAmount;
    
    return { 
      totalItemsCost, 
      totalOtherCosts, 
      subtotal, 
      profitAmount, 
      suggestedBidRate 
    };
  }, [items, otherCosts, profitPercentage]);

  const saveCalculation = () => {
    const calculation = {
      id: Date.now(),
      name: `Calculation ${savedCalculations.length + 1}`,
      items: [...items],
      otherCosts: [...otherCosts],
      profitPercentage,
      ...calculations,
      date: new Date().toLocaleDateString()
    };
    setSavedCalculations([...savedCalculations, calculation]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cost Calculator</h1>
          <p className="text-gray-500 mt-1">Calculate bid rates for goods and services</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => { setItems([]); setOtherCosts(otherCosts.map(c => ({ ...c, amount: 0 }))); }}
            className="btn btn-secondary"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
          <button 
            onClick={saveCalculation}
            disabled={items.length === 0}
            className="btn btn-primary"
          >
            <Save className="w-4 h-4" />
            Save Calculation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Add Item */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Good or Service
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Service/Good Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="e.g., AC Servicing"
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Unit Cost (MVR)</label>
                <input
                  type="number"
                  value={newItem.unitCost}
                  onChange={(e) => setNewItem({ ...newItem, unitCost: e.target.value })}
                  placeholder="600"
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Quantity</label>
                <input
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                  placeholder="6"
                  className="input w-full"
                  min="1"
                />
              </div>
            </div>
            <button
              onClick={addItem}
              className="mt-4 btn btn-primary w-full"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Add Item
            </button>
          </div>

          {/* Items List */}
          {items.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Items ({items.length})
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left">Item</th>
                      <th className="px-3 py-2 text-center">Unit Cost</th>
                      <th className="px-3 py-2 text-center">Quantity</th>
                      <th className="px-3 py-2 text-right">Total</th>
                      <th className="px-3 py-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                            className="w-full px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={item.unitCost}
                            onChange={(e) => updateItem(item.id, 'unitCost', e.target.value)}
                            className="w-24 px-2 py-1 border rounded text-center"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                            className="w-20 px-2 py-1 border rounded text-center"
                            min="1"
                          />
                        </td>
                        <td className="px-3 py-2 text-right font-medium">
                          MVR {item.totalCost.toLocaleString()}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Other Costs */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Additional Costs
            </h3>
            
            <div className="space-y-4">
              {otherCosts.map((cost) => (
                <div key={cost.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{cost.name}</h4>
                    <span className="text-sm font-semibold text-blue-700">
                      MVR {calculateCostAmount(cost).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Unit Type</label>
                      <select
                        value={cost.unitType}
                        onChange={(e) => updateOtherCost(cost.id, 'unitType', e.target.value)}
                        className="input w-full text-sm"
                      >
                        <option value="total">Total Amount</option>
                        <option value="per_day">Per Day</option>
                        <option value="per_person">Per Person</option>
                        <option value="per_day_per_person">Per Day/Person</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Rate (MVR)</label>
                      <input
                        type="number"
                        value={cost.amount}
                        onChange={(e) => updateOtherCost(cost.id, 'amount', e.target.value)}
                        placeholder="0"
                        className="input w-full text-sm"
                      />
                    </div>
                    
                    {(cost.unitType === 'per_day' || cost.unitType === 'per_day_per_person') && (
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Days</label>
                        <input
                          type="number"
                          value={cost.days}
                          onChange={(e) => updateOtherCost(cost.id, 'days', e.target.value)}
                          placeholder="1"
                          className="input w-full text-sm"
                          min="1"
                        />
                      </div>
                    )}
                    
                    {(cost.unitType === 'per_person' || cost.unitType === 'per_day_per_person') && (
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">People</label>
                        <input
                          type="number"
                          value={cost.people}
                          onChange={(e) => updateOtherCost(cost.id, 'people', e.target.value)}
                          placeholder="1"
                          className="input w-full text-sm"
                          min="1"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    {cost.unitType === 'per_day' && `= ${cost.amount} MVR × ${cost.days} days`}
                    {cost.unitType === 'per_person' && `= ${cost.amount} MVR × ${cost.people} people`}
                    {cost.unitType === 'per_day_per_person' && `= ${cost.amount} MVR × ${cost.days} days × ${cost.people} people`}
                    {cost.unitType === 'total' && `= ${cost.amount} MVR (total)`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calculator Sidebar */}
        <div className="space-y-4">
          {/* Profit Settings */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Percent className="w-5 h-5" />
              Profit Settings
            </h3>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Profit Percentage (%)</label>
              <input
                type="number"
                value={profitPercentage}
                onChange={(e) => setProfitPercentage(parseFloat(e.target.value) || 0)}
                className="input w-full"
                placeholder="15"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
            <h3 className="text-lg font-semibold mb-4">Cost Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Items Total:</span>
                <span className="font-medium">MVR {calculations.totalItemsCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Additional Costs:</span>
                <span className="font-medium">MVR {calculations.totalOtherCosts.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="text-gray-700 font-medium">Subtotal:</span>
                <span className="font-semibold">MVR {calculations.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Profit ({profitPercentage}%):</span>
                <span className="font-medium text-amber-600">
                  +MVR {calculations.profitAmount.toLocaleString()}
                </span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-semibold text-lg">Suggested Bid Rate:</span>
                <span className="text-2xl font-bold text-blue-700">
                  MVR {calculations.suggestedBidRate.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Saved Calculations */}
          {savedCalculations.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Saved Calculations
              </h3>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {savedCalculations.map((calc) => (
                  <div key={calc.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{calc.name}</p>
                        <p className="text-xs text-gray-500">{calc.date}</p>
                      </div>
                      <p className="font-semibold text-blue-700">
                        MVR {calc.suggestedBidRate.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {calc.items.length} items • {calc.profitPercentage}% profit
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

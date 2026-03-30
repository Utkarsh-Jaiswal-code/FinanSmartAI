
import React from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCurrency } from "../../../../components/CurrencyProvider";

function IncomeItem({ budget, onDelete }) {
  const { formatCurrency } = useCurrency();
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this income source? This cannot be undone.");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/incomes?id=${budget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const error = await res.json();
        toast.error(error?.error || "Failed to delete income");
        return;
      }
      toast.success("Income deleted successfully");
      onDelete?.();
    } catch (error) {
      toast.error("Failed to delete income");
      console.error(error);
    }
  };

  return (
    <div
      className="p-5 border rounded-2xl
    hover:shadow-md cursor-pointer h-[170px]"
    >
      <div className="flex flex-col  gap-3 items-center justify-between">
        <div className="flex justify-between gap-6 items-center">
          <h2
            className="text-2xl p-3 px-4
              bg-slate-100 rounded-full 
              "
          >
            {budget?.icon}
          </h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
            <h2 className="text-sm text-gray-500">{budget.totalItem} Item</h2>
          </div>
        </div>
        <div className="flex justify-between items-center gap-8">
          <h2 className="font-bold text-primary text-lg">{formatCurrency(budget.amount)}</h2>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            className="w-8 h-8 p-0"
            aria-label="Delete income"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default IncomeItem;

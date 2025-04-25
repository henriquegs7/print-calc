"use client"

import type { HistoryItem } from "@/types"
import "./styles.scss"

type HistoryListProps = {
  items: HistoryItem[]
  onDeleteItem: (index: number) => void
  onClearAll: () => void
}

export const HistoryList = ({ items, onDeleteItem, onClearAll }: HistoryListProps) => {
  return (
    <div className="history-list">
      <div className="history-header">
        <h3 className="history-title">Histórico Recente</h3>
        {items.length > 0 && (
          <button className="clear-history-button" onClick={onClearAll} title="Limpar todo o histórico">
            Limpar tudo
          </button>
        )}
      </div>
      <div className="history-items">
        {items.map((item, index) => (
          <div key={index} className="history-item">
            <div className="history-item-content">
              <span className="project-name">{item.projeto}</span>
              <span className="project-value">R$ {item.valor.toFixed(2)}</span>
            </div>
            <button className="delete-item-button" onClick={() => onDeleteItem(index)} title="Remover este item">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

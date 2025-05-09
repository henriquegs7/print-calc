import { useState, useEffect } from "react"
import Calculator from "@/assets/icon.svg"
import { CalculatorForm } from "@components/CalcForm"
import { CalculationResult } from "@components/CalcResult"
import { HistoryList } from "@components/HistoryList"
import type { HistoryItem } from "@/types"
import './App.scss'

// Chave para armazenar no localStorage
const STORAGE_KEY = "calculadora3d_historico"

// Margem de lucro (50%)
const MARGEM_LUCRO = 1.5

function App() {
  const [resultado, setResultado] = useState<number | null>(null)
  const [valorVenda, setValorVenda] = useState<number | null>(null)
  const [historico, setHistorico] = useState<HistoryItem[]>([])
  const [ultimosProjetos, setUltimosProjetos] = useState<string[]>([])

  // Carregar dados do localStorage ao iniciar o aplicativo
  useEffect(() => {
    const savedHistorico = localStorage.getItem(STORAGE_KEY)
    if (savedHistorico) {
      try {
        const parsedData = JSON.parse(savedHistorico)
        setHistorico(parsedData.historico || [])
        setUltimosProjetos(parsedData.ultimosProjetos || [])
      } catch (error) {
        console.error("Erro ao carregar dados do localStorage:", error)
      }
    }
  }, [])

  // Salvar dados no localStorage sempre que o histórico mudar
  useEffect(() => {
    if (historico.length > 0) {
      const dataToSave = {
        historico,
        ultimosProjetos,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
    }
  }, [historico, ultimosProjetos])

  const handleCalculate = (valorRolo: number, pesoRolo: number, pesoProjeto: number, nomeProjeto: string) => {
    // Cálculo: (Valor do Rolo / Peso do Rolo) * Peso do Projeto
    const custoFinal = (valorRolo / pesoRolo) * pesoProjeto
    // Cálculo do valor de venda (custo + 50%)
    const precoVenda = custoFinal * MARGEM_LUCRO

    setResultado(custoFinal)
    setValorVenda(precoVenda)

    // Adicionar ao histórico
    if (nomeProjeto.trim() !== "") {
      const novoHistorico = [
        {
          projeto: nomeProjeto,
          valor: custoFinal,
          valorVenda: precoVenda,
          data: new Date().toLocaleDateString(),
          peso: pesoProjeto,
        },
        ...historico,
      ]
      setHistorico(novoHistorico.slice(0, 10)) // Manter apenas os 10 últimos

      // Atualizar lista de nomes de projetos para sugestões
      if (!ultimosProjetos.includes(nomeProjeto)) {
        setUltimosProjetos([nomeProjeto, ...ultimosProjetos].slice(0, 5))
      }
    }
  }

  const handleClear = () => {
    setResultado(null)
    setValorVenda(null)
  }

  const handleDeleteHistoryItem = (index: number) => {
    const novoHistorico = [...historico]
    novoHistorico.splice(index, 1)
    setHistorico(novoHistorico)
  }

  const handleClearHistory = () => {
    if (confirm("Tem certeza que deseja limpar todo o histórico?")) {
      setHistorico([])
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">
            <img src={Calculator} alt="Calculator" />
            Calculadora de Custos - Impressão 3D
          </h1>
          {/* <p className="card-description">Calcule quanto você gastou em cada projeto de impressão 3D</p> */}
        </div>

        <div className="card-content">
          <CalculatorForm onCalculate={handleCalculate} onClear={handleClear} sugestoesProjetos={ultimosProjetos} />

          {resultado !== null && valorVenda !== null && <CalculationResult custo={resultado} valorVenda={valorVenda} />}
        </div>

        {historico.length > 0 && (
          <div className="card-footer">
            <HistoryList items={historico} onDeleteItem={handleDeleteHistoryItem} onClearAll={handleClearHistory} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App

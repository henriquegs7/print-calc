"use client"

import { useState, type FormEvent, useEffect } from "react"
import { Button } from "@components/ui/Button"
import { Input } from "@components/ui/Input"
import { Label } from "@components/ui/Label"
import "./styles.scss"

type CalculatorFormProps = {
  onCalculate: (valorRolo: number, pesoRolo: number, pesoProjeto: number, nomeProjeto: string) => void
  onClear: () => void
  sugestoesProjetos?: string[]
}

// Chave para armazenar os últimos valores do formulário
const FORM_STORAGE_KEY = "calculadora3d_form"

export const CalculatorForm = ({ onCalculate, onClear, sugestoesProjetos = [] }: CalculatorFormProps) => {
  const [valorRolo, setValorRolo] = useState("")
  const [pesoRolo, setPesoRolo] = useState("1000")
  const [pesoProjeto, setPesoProjeto] = useState("")
  const [nomeProjeto, setNomeProjeto] = useState("")
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false)

  // Carregar os últimos valores do formulário
  useEffect(() => {
    const savedForm = localStorage.getItem(FORM_STORAGE_KEY)
    if (savedForm) {
      try {
        const { valorRolo, pesoRolo } = JSON.parse(savedForm)
        setValorRolo(valorRolo || "")
        setPesoRolo(pesoRolo || "")
      } catch (error) {
        console.error("Erro ao carregar valores do formulário:", error)
      }
    }
  }, [])

  // Salvar os valores do rolo no localStorage
  useEffect(() => {
    if (valorRolo || pesoRolo) {
      const formData = { valorRolo, pesoRolo }
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData))
    }
  }, [valorRolo, pesoRolo])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const valorRoloNum = Number.parseFloat(valorRolo)
    const pesoRoloNum = Number.parseFloat(pesoRolo)
    const pesoProjetoNum = Number.parseFloat(pesoProjeto)

    if (isNaN(valorRoloNum) || isNaN(pesoRoloNum) || isNaN(pesoProjetoNum) || pesoRoloNum === 0) {
      alert("Por favor, insira valores válidos")
      return
    }

    onCalculate(valorRoloNum, pesoRoloNum, pesoProjetoNum, nomeProjeto)
    // Limpar apenas o peso do projeto e nome após calcular
    setPesoProjeto("")
    setNomeProjeto("")
  }

  const handleClear = () => {
    setValorRolo("")
    setPesoRolo("")
    setPesoProjeto("")
    setNomeProjeto("")
    localStorage.removeItem(FORM_STORAGE_KEY)
    onClear()
  }

  const selecionarSugestao = (sugestao: string) => {
    setNomeProjeto(sugestao)
    setMostrarSugestoes(false)
  }

  return (
    <form onSubmit={handleSubmit} className="calculator-form">
      <div className="form-group">
        <Label htmlFor="nomeProjeto">Nome do Projeto</Label>
        <div className="input-with-suggestions">
          <Input
            id="nomeProjeto"
            placeholder="Miniatura Dragon"
            value={nomeProjeto}
            onChange={(e) => setNomeProjeto(e.target.value)}
            onFocus={() => setMostrarSugestoes(true)}
            onBlur={() => setTimeout(() => setMostrarSugestoes(false), 200)}
          />
          {mostrarSugestoes && sugestoesProjetos.length > 0 && (
            <div className="suggestions">
              {sugestoesProjetos.map((sugestao, index) => (
                <div key={index} className="suggestion-item" onClick={() => selecionarSugestao(sugestao)}>
                  {sugestao}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="form-group">
        <Label htmlFor="valorRolo">Valor do Rolo (R$)</Label>
        <Input
          id="valorRolo"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="R$120.00"
          value={valorRolo}
          onChange={(e) => setValorRolo(e.target.value)}
          required
        />
      </div>

      <div className="group-gramar">
        <div className="form-group">
          <Label htmlFor="pesoRolo">Peso do Rolo (g)</Label>
          <Input
            id="pesoRolo"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="1000g"
            value={pesoRolo}
            onChange={(e) => setPesoRolo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <Label htmlFor="pesoProjeto">Peso do Projeto (g)</Label>
          <Input
            id="pesoProjeto"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="50g"
            value={pesoProjeto}
            onChange={(e) => setPesoProjeto(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="line"></div>

      <div className="form-actions">
        <Button type="submit">Calcular</Button>
        <Button type="button" onClick={handleClear} variant="outline">
          Limpar
        </Button>
      </div>
    </form>
  )
}

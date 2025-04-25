import "./styles.scss"

type CalculationResultProps = {
  valor: number
}

export const CalculationResult = ({ valor }: CalculationResultProps) => {
  return (
    <div className="calculation-result">
      <p>
        Custo do projeto: <span className="result-value">R$ {valor.toFixed(2)}</span>
      </p>
    </div>
  )
}

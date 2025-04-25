import "./styles.scss"

type CalculationResultProps = {
  custo: number
  valorVenda: number
}

export const CalculationResult = ({ custo, valorVenda }: CalculationResultProps) => {
  return (
    <div className="calculation-result">
      <div className="result-item">
        <h4 className="result-label">Custo de Produção:</h4>
        <p className="result-value">R$ {custo.toFixed(2)}</p>
      </div>

      <div className="result-item">
        <h4 className="result-label">Valor de Venda (+50%):</h4>
        <p className="result-value sale-value">R$ {valorVenda.toFixed(2)}</p>
      </div>
    </div>
  )
}

const { React, antd } = window
import config from './config'
const { DENSITY } = config

function toFixed(p, num = 2) {
    console.log(typeof p)
    return isNaN(p) ? '' : p.toFixed(num)
}

export default class Price extends React.Component {

    corePrice = c => {
        const { coreNum, coreArea, coreType } = c
        const priceConfig = this.props.priceConfig
        const p = coreNum * coreArea * DENSITY[coreType] * priceConfig.core[coreType] / 1000000
        return toFixed(p)
    }

    insulationPrice = c => {
        const { coreNum, coreArea, insulation } = c
        const priceConfig = this.props.priceConfig
        const p = coreNum * priceConfig.insulationWeight[coreArea] * priceConfig.insulation[insulation]
        return toFixed(p)
    }

    sheathPrice = c => {
        const { coreNum, coreArea, sheath } = c
        const priceConfig = this.props.priceConfig
        const p = priceConfig.sheathWeight[`${coreNum}*${coreArea}`] * priceConfig.sheath[sheath]
        return toFixed(p)
    }

    total = c => {
        const p = +this.corePrice(c) + (+this.insulationPrice(c)) + (+this.sheathPrice(c))
        return toFixed(p)
    }

    totalUSD = c => {
        const p = this.props.priceConfig.exchangeRage.USD * this.total(c)
        return toFixed(p)
    }

    render() {
        return this.props.cables.map(c => {
            if (this.props.priceConfig.exchangeRage.USD) {
                console.log(this.props)
                return (
                    <div key={c.id}>
                        <span>{`${c.coreNum}*${c.coreArea}:`}</span>
                        <span>{`${this.corePrice(c)}+${this.insulationPrice(c)}+${this.sheathPrice(c)}`}</span>
                        <span>{`=${this.total(c)}RMB=${this.totalUSD(c)}USD`}</span>
                    </div>
                )
            } else {
                return null
            }
        })
    }
}
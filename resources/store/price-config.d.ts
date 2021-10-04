import { Material, SWA } from './cable'

export type Price = {
  [index: string]: number
}

export type Weight = {
  [index: string]: number
}

type materialConfig = {
  [index in Material]: number
}

type exchangeRateConfig = {
  USD: number
}

type swaWeightConfig = {
  [index in SWA]: number
}

export type PriceConfig = {
  exchangeRate: exchangeRateConfig
  material: materialConfig
  coreWeight: Weight
  braidedWeight: Weight
  iscrWeight: Weight
  insulationWeight: Weight
  oscrWeight: Weight
  sheathWeight: Weight
  innerSheathWeight: Weight
  swaWeight: swaWeightConfig
}

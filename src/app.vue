<template>
  <div>
    <a-input placeholder="请输入1RMB兑换多少USD" v-model="usd" style="width: 200px;" />
    <div>
      <a-input placeholder="芯数" v-model="core" style="width: 100px;" />*
      <a-input placeholder="平方" v-model="mmsq" style="width: 100px;" />
      <a-input placeholder="铜材" v-model="cu" style="width: 100px;" />
      <a-select style="width: 120px" v-model="plastic" placeholder="绝缘材料">
        <a-select-option value="XLPE">XLPE</a-select-option>
        <a-select-option value="PVC">PVC</a-select-option>
        <a-select-option value="橡胶">橡胶</a-select-option>
        <a-select-option value="PE">PE</a-select-option>
      </a-select>
      <a-select style="width: 120px" v-model="out">
        <a-select-option value="WDZ">WDZ</a-select-option>
        <a-select-option value="PVC">PVC</a-select-option>
      </a-select>
      <span width="width: 100px;">{{ rmbPrice }}RMB</span>
      <span width="width: 100px;">{{ usdPrice }}USD</span>
    </div>
  </div>
</template>

<script>
import { isDebuging } from "./utils";

const weight = {
  "2.5": 22
};

const plastic = {
  "2.5": 13
};

const plasticWeight = {
  XLPE: 0.014
};

const outWeight = {
  "1*2.5": 60,
  "2*2.5": 60,
  "3*2.5": 61,
  "4*2.5": 85,
  "5*2.5": 92,
  "7*2.5": 100
};

const outPrice = {
  WDZ: 0.012,
  PVC: 0.009
};

export default {
  data() {
    return {
      usd: "",
      core: "",
      mmsq: "",
      cu: "",
      plastic: "XLPE",
      out: "WDZ"
    };
  },
  computed: {
    cuPrice() {
      return (this.core * weight[this.mmsq] * this.cu) / 1000;
    },
    plasticPrice() {
      return this.core * plastic[this.mmsq] * plasticWeight[this.plastic];
    },
    outPrice() {
      return outWeight[`${this.core}*${this.mmsq}`] * outPrice[this.out];
    },
    rmbPrice() {
      try {
        const v = this.cuPrice + this.plasticPrice + this.outPrice;
        console.log(v);
        return isNaN(v) ? "" : v.toFixed(2);
      } catch (e) {
        return "";
      }
    },
    usdPrice() {
      try {
        const v = this.rmbPrice * this.usd;
        return isNaN(v) ? "" : v.toFixed(2);
      } catch (e) {
        return "";
      }
    }
  },
  methods: {}
};
</script>

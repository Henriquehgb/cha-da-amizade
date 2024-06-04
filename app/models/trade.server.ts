// import arc from "@architect/functions";
// import { createId } from "@paralleldrive/cuid2";

// import type { User } from "./user.server";
// import { EnviromentData } from "./../../../index";
// export type Note = {
//   id: ReturnType<typeof createId>;
//   userId: User["id"];
//   title: string;
//   body: string;
// };

export class EnviromentData {

  initialCurrencyUseToBuyBalance: number;
  
  trade: TradingData;
  config: ConfigValues;

  buyStack: any[];
  sellStack: any[];
  
  tradingDataList: any[];
  accountStateList: any[];
  
  countRunTimes: number;
  buyIndexToInit: number;
  
  totalQuantityBuyedNotSelled: number;
  maxTotalBuyOrdersNotSelled: number = 0;
  //priceSafeMinLimit: number;
  pauseLogs: boolean;
  pauseRunning: boolean;

  constructor(
      values:{
          tradeSymbol: string,
          currencyUseToBuyBalance: number,
          totalToBuy: number,
          sliceToBuy: number,
          minMaxPriceRangeExpected: number,
          feePerSlice: number,
          marginToWaitToWarnTheBrokeFlowUp: number,
          marginToWaitToWarnTheBrokeFlowDown: number,
          minMaxPriceRangeWhenBrokeTheExpected: number,
          marginToWaitToWarnTheBrokeFlowWhenTheRangeBrokeTheExpected: number,
          safeMaxPriceToBuyLimit: number,
          timer: number,
          initialLastMaxPrice?: number ,
          initialLastMinPrice?: number ,
          priceToStartAfterTurnLowerThen?: number ,
          runTimesLimit?: number,
          priceSafeMinLimit?: number ,
          scaleMarginToBuyExponentially?: number 
      },
      
  ) {
      this.initialCurrencyUseToBuyBalance = values.currencyUseToBuyBalance;
      this.config = {
          tradeSymbol: values.tradeSymbol,
          currencyUseToBuyBalance: values.currencyUseToBuyBalance,
          initialTotalToBuy: values.totalToBuy,
          lastTotalToBuySettedByHuman: values.totalToBuy,
          sliceToBuy: values.sliceToBuy,
          minMaxPriceRangeExpected: values.minMaxPriceRangeExpected,
          feePerSlice: values.feePerSlice,
          marginToWaitToWarnTheBrokeFlowUp: values.marginToWaitToWarnTheBrokeFlowUp,
          marginToWaitToWarnTheBrokeFlowDown: values.marginToWaitToWarnTheBrokeFlowDown,
          minMaxPriceRangeWhenBrokeTheExpected: values.minMaxPriceRangeWhenBrokeTheExpected,
          marginToWaitToWarnTheBrokeFlowWhenTheRangeBrokeTheExpected: values.marginToWaitToWarnTheBrokeFlowWhenTheRangeBrokeTheExpected,
          safeMaxPriceToBuyLimit: values.safeMaxPriceToBuyLimit,
          safeMinPriceToBuyLimit: values.priceSafeMinLimit ?? 0,
          timer: values.timer,
          initialLastMaxPrice: values.initialLastMaxPrice ?? null,
          initialLastMinPrice: values.initialLastMinPrice ?? values.initialLastMaxPrice ?? null,
          priceToStartAfterTurnLowerThen: values.priceToStartAfterTurnLowerThen ?? null,
          runTimesLimit: values.runTimesLimit ?? null,
          scaleMarginToBuyExponentially: values.scaleMarginToBuyExponentially ?? 0
      };

      this.trade = {
          tradeSymbol: values.tradeSymbol,
          currencyUseToBuyBalance: values.currencyUseToBuyBalance,
          totalToBuy: values.totalToBuy,
          sliceToBuy: values.sliceToBuy,
          feePerSlice: values.feePerSlice,
          lastMaxPrice: values.initialLastMaxPrice ?? null,
          lastMinPrice: values.initialLastMinPrice ?? values.initialLastMaxPrice ?? null,
          smallerBuyNotSelledPrice: null,
          lastCheckedPrice: null,
          maxLimitPriceToBuy: null,
          minLimitPriceToSell: null,
          brokeUpFlowWaitingLimitPrice:null,
          brokeDownFlowWaitingLimitPrice:null
      };
      
      this.buyStack = [];
      this.sellStack = [];
      this.tradingDataList = [];
      this.accountStateList = [];
      this.countRunTimes = 0;
      this.buyIndexToInit = 0;
      this.totalQuantityBuyedNotSelled = 0;
      this.pauseLogs = false;
      this.pauseRunning = false;
  }
}

export type ConfigValues = {
  runTimesLimit: number|null;
  tradeSymbol: string;
  currencyUseToBuyBalance: number;
  initialTotalToBuy: number;
  lastTotalToBuySettedByHuman: number;
  sliceToBuy: number;
  feePerSlice: number,
  initialLastMaxPrice: number|null;
  initialLastMinPrice : number|null;
  timer:number;
  minMaxPriceRangeExpected: number;
  marginToWaitToWarnTheBrokeFlowDown: number;
  marginToWaitToWarnTheBrokeFlowUp: number;
  safeMaxPriceToBuyLimit: number;
  safeMinPriceToBuyLimit: number;
  minMaxPriceRangeWhenBrokeTheExpected: number;
  marginToWaitToWarnTheBrokeFlowWhenTheRangeBrokeTheExpected:number;
  scaleMarginToBuyExponentially: number;
  priceToStartAfterTurnLowerThen: number|null;
  
};

export type TradingData = {
  lastTurnDateTime?: Date;
  tradeSymbol: string;
  currencyUseToBuyBalance: number;
  totalToBuy: number;
  sliceToBuy: number;
  feePerSlice: number,
  lastMaxPrice: number|null;
  lastMinPrice: number|null;
  smallerBuyNotSelledPrice: number|null;
  lastCheckedPrice: number|null;
  maxLimitPriceToBuy: number|null;
  minLimitPriceToSell: number|null;
  brokeUpFlowWaitingLimitPrice:number|null;
  brokeDownFlowWaitingLimitPrice:number|null;
};

export function getConfigObjects(fileName:string): ConfigValues[] {
  const fs = require('fs');
  // Read the JSON data from the file
  const jsonData = fs.readFileSync(fileName, 'utf-8');
  // Parse the JSON data
  const data = JSON.parse(jsonData);

  return data;
}

export function getActualEnviromentDataObjects(): EnviromentData[] {
  const fs = require('fs');
  // Read the JSON data from the file
  const jsonData = fs.readFileSync('./../../actualTradeEnviroments.json', 'utf-8');
  // Parse the JSON data
  const data = JSON.parse(jsonData);
  // Create an array of EnviromentData objects
  const eds = data.map((item:any) => {
      return item as EnviromentData;
  });
  return eds;
}

export function getActualEnviromentDataObject(id:number): EnviromentData[] {
  const fs = require('fs');
  // Read the JSON data from the file
  const jsonData = fs.readFileSync('./../../actualTradeEnviroments.json', 'utf-8');
  // Parse the JSON data
  const data = JSON.parse(jsonData);
  // Create an array of EnviromentData objects
  const eds = data.map((item:any) => {
      return item as EnviromentData;
  });
  return eds[id];
}

export function saveConfigTradeEnviromentsJson(eds: ConfigValues[]) {
  const fs = require('fs');
  fs.writeFileSync('initialTradeEnviroments.json', JSON.stringify(eds), 'utf8');
}
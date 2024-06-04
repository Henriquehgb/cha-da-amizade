import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { EnviromentData, getActualEnviromentDataObjects } from "~/models/trade.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  //const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");
  const list = getActualEnviromentDataObjects();
  const tradeED:EnviromentData = list[Number(params.noteId)];
  let result = [];
  for (let i = tradeED.tradingDataList.length-1; i > 0; i--) {
    const element = tradeED.tradingDataList[i];
    result.push(element);
  }

  if (!tradeED) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ tradeED, tradeLogList: result});
};

export const action = async ({ params, request }: ActionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");

  //await deleteNote({ id: params.noteId, userId });

  return redirect("/notes");
};

const iframee = ()=>{return <iframe src="https://www.google.com" width="1000px" height="1000px"></iframe>}

export default function TradeDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.tradeED.trade.tradeSymbol}</h3>
      <p >totalToBuy: {data.tradeED.trade.totalToBuy}</p>
      <p >sliceToBuy: {data.tradeED.trade.sliceToBuy}</p>
      <p >feePerSlice: {data.tradeED.trade.feePerSlice}</p>
      <p >marginToWaitToWarnTheBrokeFlowUp: {data.tradeED.config.marginToWaitToWarnTheBrokeFlowUp}</p>
      <p >marginToWaitToWarnTheBrokeFlowDown: {data.tradeED.config.marginToWaitToWarnTheBrokeFlowDown}</p>
      <p >minMaxPriceRangeExpected: {data.tradeED.config.minMaxPriceRangeExpected}</p>
      <p >minMaxPriceRangeWhenBrokeTheExpected: {data.tradeED.config.minMaxPriceRangeWhenBrokeTheExpected}</p>
      <p >marginToWaitToWarnTheBrokeFlowWhenTheRangeBrokeTheExpected: {data.tradeED.config.marginToWaitToWarnTheBrokeFlowWhenTheRangeBrokeTheExpected}</p>
      <p >scaleMarginToBuyExponentially: {data.tradeED.config.scaleMarginToBuyExponentially}</p>
      <hr></hr>
      <div className="overflow-scroll" >
      <div style={{width:"300000px"}}>
      {data.tradeLogList.map((tradeLog:any) => (
        <div style={{display:"inline-block",width:"380px"}}>
        
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>brokeUpFlowWaitingLimitPrice:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.brokeUpFlowWaitingLimitPrice}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>minLimitPriceToSell:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.minLimitPriceToSell}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>smallerBuyNotSelledPrice_:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.smallerBuyNotSelledPrice}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>lastCheckedPrice:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.lastCheckedPrice}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>actualPrice:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.actualPrice}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>maxLimitPriceToBuy:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.maxLimitPriceToBuy}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>brokeDownFlowWaitingLimitPrice:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.brokeDownFlowWaitingLimitPrice}</span></p>
        <hr/>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>lastMaxPrice:</span><span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}> {tradeLog.lastMaxPrice}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>lastMinPrice:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.lastMinPrice}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>smallerBuyNotSelledPrice:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.smallerBuyNotSelledPrice}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>minMaxActualRange:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.lastMaxPrice && tradeLog.lastMinPrice ? (tradeLog.lastMaxPrice - tradeLog.lastMinPrice) / tradeLog.lastMaxPrice : 0}</span></p>
        <hr/>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>totalQuantityBuyedNotSelled:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.totalQuantityBuyedNotSelled}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>buyOrdersNotSelled:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.buyOrdersNotSelled}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>ordersSelled:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.ordersSelled}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>totalAmountOfBuyOrders:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.totalAmountOfBuyOrders}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>totalAmountOfSellOrders:</span><span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.totalAmountOfSellOrders}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>totalAmountOfBuyOrdersSelled:</span><span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.totalAmountOfBuyOrdersSelled}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>buyAndSellAmountFee:</span><span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.buyAndSellAmountFee}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>buyAndSellAmountFeeRatio:</span><span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.buyAndSellAmountFeeRatio}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>currencyUseToBuyBalance:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.currencyUseToBuyBalance}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>initialCurrencyUseToBuyBalance:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.initialCurrencyUseToBuyBalance}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>feeRatioByInitialCurrencyUseToBuyBalance:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.initialCurrencyUseToBuyBalance}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>maxTotalBuyOrdersNotSelled:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.maxTotalBuyOrdersNotSelled}</span></p>
        <p ><span style={{display:"inline-block",width:"260px", height:"20px"}}>turnDateTime:</span> <span style={{display:"inline-block", overflow:"hidden",width:"100px", height:"20px"}}>{tradeLog.lastTurnDateTime}</span></p>
        </div>
        ))}
      </div>
      
      </div>
      {/* <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form> */}
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>Note not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}

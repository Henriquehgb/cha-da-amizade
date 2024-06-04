import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { EnviromentData, getActualEnviromentDataObjects } from "~/models/trade.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export const loader = async ({ request }: LoaderArgs) => {
  //const userId = await requireUserId(request);
  const tradeListItems: EnviromentData[] = getActualEnviromentDataObjects();
  
  let i = 0;
  let list = tradeListItems
    .map((ed:any) => { 
    //   let totalAmountOfBuyOrders = 0;
    // if (ed.buyStack.length > 0)
    //     totalAmountOfBuyOrders = ed.buyStack.map((a:any) => Number(a.cummulativeQuoteQty)).reduce(function (a, b) { return a + b; });
    let totalAmountOfSellOrders = 0;
    if (ed.sellStack.length > 0)
        totalAmountOfSellOrders = ed.sellStack.map((a:any) => Number(a.cummulativeQuoteQty)).reduce(function (a:number, b:number) { return a + b; });
    let buyOrdersSelled = ed.buyStack.filter((o:any) => o.selled);
    let totalAmountOfBuyOrdersSelled = 0;
    if (buyOrdersSelled.length > 0)
        totalAmountOfBuyOrdersSelled = buyOrdersSelled.map((a:any) => Number(a.cummulativeQuoteQty)).reduce(function (a:number, b:number) { return a + b; });
    let buyAndSellAmountFee = totalAmountOfSellOrders - totalAmountOfBuyOrdersSelled;
    let maxBalanceLockedInBuyOrdersNotSelled = ed.maxTotalBuyOrdersNotSelled * ed.trade.sliceToBuy;
    let ratioByMaxBalanceLockedInBuyOrdersNotSelled = buyAndSellAmountFee / maxBalanceLockedInBuyOrdersNotSelled??1;

      return{
        ...ed,
        quantityOfBuyOrdersNotSelled: ed.buyStack.filter((b:any) => b.selled != true).length,
        quantityOfBuyOrdersSelled: ed.buyStack.filter((b:any) => b.selled == true).length, 
        ratioByMaxBalanceLockedInBuyOrdersNotSelled, 
        id: i++
      } 
    });
  return json({ tradeListItems:list });
};

export default function TradesPage() {
  const data = useLoaderData<typeof loader>();
  //const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Trade Bots</Link>
        </h1>
        {/* <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form> */}
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-100 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Trade
          </Link>

          <hr />

          {data.tradeListItems.length === 0 ? (
            <p className="p-4">No trades yet</p>
          ) : (
            <ol style={{width:"250px"}}>
              {data.tradeListItems.map((tradeED:any) => (
                <li key={tradeED.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={tradeED.id}
                  >
                    📈 {tradeED.trade.tradeSymbol}({tradeED.quantityOfBuyOrdersNotSelled})({tradeED.quantityOfBuyOrdersSelled})+{tradeED.t}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

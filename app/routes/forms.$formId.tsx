import { Form, Link, Outlet } from "@remix-run/react";
import { ActionArgs } from "@remix-run/server-runtime";

export const action = async ({ params, request }: ActionArgs) => {
    // const userId = await requireUserId(request);
    // invariant(params.noteId, "noteId not found");

    // await deleteNote({ id: params.noteId, userId });

    // return redirect("/notes");
};

export default function FormsPage() {
    return (<div className="min-h-screen" >
        <div className="flex h-full min-h-screen flex-col">
            <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
                <h1 className="text-3xl font-bold">
                    Formularios
                </h1>
            </header>
            <main className="flex h-full bg-white ">

                <div className="h-full w-full border-r bg-gray-50">
                    <Form method="post">
                        <label htmlFor="nome">Nome:</label> <input type="text" name="nome" />
                        <br/>
                        <label htmlFor="idade">Idade:</label> <input type="text" name="idade" />
                        <br/>
                        <label htmlFor="celular">Celular:</label> <input type="text" name="celular" />
                        <br/>
                        <br/>
                        Diagnostico<br />
                        <textarea rows={4} name="diagnosis" />
                    </Form>
                    <hr />
                    Histórico<br />
                    <Link to="new" className="block p-4 text-xl text-blue-500">
                        + Colocar Informações de Hoje</Link>
                    <br />
                    <label >10/10/2010</label>
                    <textarea rows={3} name="historico10102010" />



                    <hr />

                </div>

                {/* <div className="flex-1 p-6">
                    <Outlet />
                </div> */}

            </main>
        </div>
    </div>);
}
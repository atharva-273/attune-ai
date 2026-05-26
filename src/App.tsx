import { Agentation } from "agentation";
import { AppRouter } from "./app/AppRouter";

export default function App() {
  const agentationEndpoint =
    import.meta.env.VITE_AGENTATION_ENDPOINT ?? "http://127.0.0.1:4747";

  return (
    <>
      <AppRouter />
      {import.meta.env.DEV && <Agentation endpoint={agentationEndpoint} />}
    </>
  );
}

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CassinoApp() {
  const [saldo, setSaldo] = useState(1000);
  const [aposta, setAposta] = useState(50);
  const [mensagem, setMensagem] = useState("");
  const [historico, setHistorico] = useState([]);

  function jogar() {
    if (aposta > saldo || aposta <= 0) {
      setMensagem("Aposta inválida.");
      return;
    }
    const venceu = Math.random() < 0.3;
    const novoSaldo = venceu ? saldo + aposta : saldo - aposta;
    setSaldo(novoSaldo);
    setMensagem(venceu ? "Você ganhou!" : "Você perdeu!");
    setHistorico([{ aposta, resultado: venceu ? "Vitória" : "Derrota" }, ...historico]);
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Cassino Simulado 🎰</h1>
      <p className="text-lg mb-2">Saldo: R$ {saldo.toFixed(2)}</p>
      <input
        type="number"
        value={aposta}
        onChange={(e) => setAposta(Number(e.target.value))}
        className="border p-2 rounded w-full mb-2"
      />
      <button
        onClick={jogar}
        className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition"
      >
        Apostar
      </button>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center text-lg font-medium">
        {mensagem}
      </motion.div>
      <div className="mt-4">
        <h2 className="font-bold">Histórico</h2>
        <ul className="text-sm">
          {historico.slice(0, 10).map((item, index) => (
            <li key={index}>
              Aposta de R$ {item.aposta} - {item.resultado}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

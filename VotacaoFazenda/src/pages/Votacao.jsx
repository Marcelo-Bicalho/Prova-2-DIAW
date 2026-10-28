import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard';
import { listarNaRoca, listarForaDaRoca, registrarVoto } from '../services/votacaoService';

export default function Votacao() {
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [votosNaSessao, setVotosNaSessao] = useState(0);

  const naRoca = listarNaRoca();
  const foraDaRoca = listarForaDaRoca();

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante.nome);
    setVotosNaSessao(prev => prev + 1);
  }

  return (
    <main>
      <h2>Quem você quer eliminar?</h2>
      {ultimoVoto && (
        <div className="mensagem-voto">
          Voto registrado para eliminar {ultimoVoto}. Você já votou {votosNaSessao} {votosNaSessao === 1 ? 'vez' : 'vezes'}.
          <Link to="/resultado">Ver resultado</Link>
        </div>
      )}
      <section className="grade-roca">
        {naRoca.map(p => (
          <ParticipanteCard key={p.id} participante={p} onVotar={handleVotar} />
        ))}
      </section>
      <h2>Demais peões</h2>
      <section className="grade-peoes">
        {foraDaRoca.map(p => (
          <ParticipanteCard key={p.id} participante={p} />
        ))}
      </section>
    </main>
  );
}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { obterVotos, calcularTotalVotos, calcularResultado, zerarVotos } from '../services/votacaoService';

export default function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());

  const total = calcularTotalVotos(votos);
  const resultado = calcularResultado(votos);

  function handleZerar() {
    if (window.confirm('Apagar todos os votos?')) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <main>
      <h2>Parcial da eliminação</h2>
      <p>{total} votos computados</p>
      
      {total === 0 ? (
        <div className="sem-votos">
          <p>Nenhum voto ainda. Escolha quem sai da roça para ver a parcial.</p>
          <Link to="/votacao">Ir para a votação</Link>
        </div>
      ) : (
        <section className="lista-resultados">
          {resultado.map((p, index) => (
            <div key={p.id} className={index === 0 ? 'placar-lider' : ''}>
              <img src={p.foto} alt={p.nome} />
              <div>
                <h3>{p.nome} {index === 0 && <span className="selo-lider">Sairia hoje</span>}</h3>
                <div className="barra">
                  <div
                    className="barra-preenchida"
                    style={{ width: `${p.percentual}%` }}
                  ></div>
                </div>
                <p>{p.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}% ({p.votos} votos)</p>
              </div>
            </div>
          ))}
          <button onClick={handleZerar}>Zerar votação</button>
        </section>
      )}
    </main>
  );
}
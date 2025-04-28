import { investments } from './data/investments.js';
import { formatCurrency } from './lib/format.js';

for (const investment of investments) {
  const cardInvestment = `<div class="col">
    <div id="investment-${investment.id}" class="card">
      <div class="card-header">
        ${investment.name}
        <span class="icon iconamoon--trash float-end"></span>
      </div>
      <div class="card-body">
        <p class="card-text">
          Valor: ${formatCurrency(investment.value / 100)}
        </p>
      </div>
    </div>
  </div>`;

  const investmentsGrid = document.querySelector('.investments-grid');

  investmentsGrid.insertAdjacentHTML('beforeend', cardInvestment);

  const trashIcon = document.querySelector(
    `#investment-${investment.id} .icon`
  );

  trashIcon.onclick = function () {
    console.log('Remover investimento', investment.id);

    const cardInvestment = document.querySelector(
      `#investment-${investment.id}`
    );

    cardInvestment.parentNode.remove();
  };
}

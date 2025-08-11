import { formatCurrency, formatDate } from './lib/format.js';

function createInvestmentCard(investment) {
  const cardInvestment = `<div class="col">
    <div id="investment-${investment.id}" class="card">
      <div class="card-header">
        ${investment.name}
        <span class="icon iconamoon--trash float-end"></span>
      </div>
      <div class="card-body">
        <div>
          <span class="fw-bold">Valor:</span>
          <span class="investment-value">
            ${formatCurrency(investment.value / 100)}
          </span>
        </div>
        <div>
          <span class="fw-bold">Taxa:</span>
          <span class="investment-interest">
            ${investment.interest}
          </span>
        </div>
        <div>
          <span class="fw-bold">Data:</span>
          <span class="investment-created-at">
            ${formatDate(investment.createdAt)}
          </span>
        </div>
        <div>
          <span class="fw-bold">Corretora:</span>
          <span class="investment-broker">
            ${investment.broker.name}
          </span>
        </div>
        <div>
          <span class="fw-bold">Categoria:</span>
          <span
            class="badge investment-category"
            style="background-color: ${investment.category.color}"
          >
            ${investment.category.name}
          </span>
        </div>
      </div>
    </div>
  </div>`;

  const investmentsGrid = document.querySelector('.investments-grid');

  investmentsGrid.insertAdjacentHTML('beforeend', cardInvestment);

  const trashIcon = document.querySelector(
    `#investment-${investment.id} .icon`
  );

  trashIcon.onclick = function () {
    const cardInvestment = document.querySelector(
      `#investment-${investment.id}`
    );

    cardInvestment.parentNode.remove();

    fetch(`/api/investments/${investment.id}`, {
      method: 'DELETE',
    });
  };
}

// Handle form submission
const form = document.querySelector('#investment-form');

form.onsubmit = async function (event) {
  event.preventDefault();

  const investment = Object.fromEntries(new FormData(form));

  investment.value = Number(investment.value) * 100;

  const response = await fetch('/api/investments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(investment),
  });

  const createdInvestment = await response.json();

  investments.push(createdInvestment);

  createInvestmentCard(createdInvestment);

  form.reset();

  document.querySelector('#offcanvas-close').click();
};

async function loadCategoriesSelect() {
  const select = document.querySelector('#categoryId');

  const response = await fetch('/api/categories');
  const categories = await response.json();

  for (const category of categories) {
    const option = `<option value="${category.id}">${category.name}</option>`;

    select.insertAdjacentHTML('beforeend', option);
  }
}

// Load initial investments
const response = await fetch('/api/investments');
const investments = await response.json();

loadCategoriesSelect();

for (const investment of investments) {
  createInvestmentCard(investment);
}

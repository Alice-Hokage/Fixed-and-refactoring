function statement(invoice, plays) {

    let result = `Счет для ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
      result += ` ${playFor(perf).name}: `;
      result += `${rub(amountFor(perf))} (${perf.audience} мест)\n `;
  }

  result += `Итого с вас ${rub(allAmount())}\n`;
  result += `Вы заработали ${totalVolumeCredits()} бонусов\n`;
    return result;
  function amountFor(performance) {
      let quantity = 0;
    switch (playFor(performance).type) {
      case "tragedy":
        quantity = 40000;
        if (performance.audience > 30) {
        quantity += 1000 * (performance.audience - 30);
      }

        break;

      case "comedy":
        quantity = 30000;

        if (performance.audience > 20) {
        quantity += 10000 + 500 * (performance.audience - 20);
      }
      quantity += 300 * performance.audience;
      break;
      
      default:
        throw new Error('неизвестный тип: ${playFor(performance).type}');
    }
    return quantity;
  }
  function volumeCreditsFor(performance) {
    let quantity = 0;
    quantity += Math.max(performance.audience - 30, 0);

    if ("comedy" === playFor(performance).type)
      quantity += Math.floor(performance.audience / 5);

    return quantity;
  }
  function totalVolumeCredits() {
    let quantity = 0;

    for (let perf of invoice.performances) {
      quantity += volumeCreditsFor(perf);
    }
    return quantity;
  }
  function rub(aNumber) {
    return new Inti.NumberFormat("ru-RU",
        { style: "currency", currency: "RUB",
        minimumFractionDigits: 2 }).format(aNumber/100);
  }
  function allAmount() {
    let quantity = 0;

    for (let perf of invoice.performances) {
          quantity += amountFor(perf);
      }
      return quantity;
  }
}
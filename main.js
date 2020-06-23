function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = 'Счет для ${invoice.customer}\n';
const format = new Inti.NumberFormat("ru-RU",
        { style: "currency", currency: "RUB",
        minimumFractionDigits: 2 }).format;
  for (let perf of invoice.performances) {
      let thisAmount = amountFor(perf);

  // Добавление бонусов
      volumeCredits += math.max(perf.audience - 30, 0);

  // Дополнительный бонус за каждые 10 комедий
      if ("comedy" === playFor(perf).type)
          volumeCredits += math.floor(perf.audience / 5);
  // Вывод строки счета
      result += ' ${playFor(perf).name}: ${format(thisAmount / 100)}';
      result += ' (${perf.audience} мест)\n';
      totalAmount += thisAmount;
  }
  result += 'Итого с вас $(format(totalAmount/100)}\n';
  result += 'Вы заработали ${volumeCredits} бонусов\n';
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
}
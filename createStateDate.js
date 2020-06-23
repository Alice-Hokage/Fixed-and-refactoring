export default function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

    function amountFor(performance) {
        let quantity = 0;
      switch (performance.play.type) {
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
          throw new Error('неизвестный тип: ${performance.play.type}');
      }
      return quantity;
    }
    function volumeCreditsFor(performance) {
      let quantity = 0;
      quantity += Math.max(performance.audience - 30, 0);

      if ("comedy" === performance.play.type)
        quantity += Math.floor(performance.audience / 5);

      return quantity;
    }
    function totalVolumeCredits(data) {
      return data.performances
        .reduce((total, p) => total + p.volumeCredits, 0);
    }
    function rub(aNumber) {
      return new Inti.NumberFormat("ru-RU",
          { style: "currency", currency: "RUB",
          minimumFractionDigits: 2 }).format(aNumber/100);
    }
    function allAmount(data) {
      return data.performances
        .reduce((total, p) => total + p.amount, 0);

    }
    function playFor(perfоrmance) {
      return plays[performance.playlD];
    }
    function enrichPerformance(performance) {
      const result = Object.assign({}, performance);
      result.play = playFor(result);
      result.amount = amountFor(result);
      result.volumeCredits = volumeCreditsFor(result);
      return result;
    }
}
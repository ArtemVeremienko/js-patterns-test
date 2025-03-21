function parseCsvData(csvData) {
  if (!csvData) {
    return []
  }

  const [headersRow, ...dataRows] = csvData.split('\n')
  const headers = headersRow.split(',')

  return dataRows.map((row) => {
    const values = row.split(',')
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index]
      return obj
    }, {})
  })
}

function calculatePercentage(value, maxValue) {
  return Math.round((parseInt(value, 10) * 100) / maxValue)
}

function calculateDensityPercentages(data) {
  if (!data || data.length === 0) {
    return []
  }

  const densities = data.map((item) => parseInt(item.density, 10))
  const maxDensity = Math.max(...densities)

  return data.map((item) => ({
    ...item,
    densityPercentage: calculatePercentage(item.density, maxDensity).toString(),
  }))
}

function getFormattedData(data) {
  if (!data || data.length === 0) {
    return
  }

  const formattedRows = data
    .sort(
      (a, b) =>
        parseInt(b.densityPercentage, 10) - parseInt(a.densityPercentage, 10)
    )
    .map((item) => {
      const { city, population, area, density, country, densityPercentage } =
        item
      return (
        city.padEnd(18) +
        population.padStart(10) +
        area.padStart(8) +
        density.padStart(8) +
        country.padStart(18) +
        densityPercentage.padStart(6)
      )
    })

  formattedRows.forEach((row) => console.log(row))
}

export function csvToTable(csv) {
  const parsedData = parseCsvData(csv)
  const dataWithPercentages = calculateDensityPercentages(parsedData)
  return getFormattedData(dataWithPercentages)
}

// Main execution
export const data = `city,population,area,density,country
  Shanghai,24256800,6340,3826,China
  Delhi,16787941,1484,11313,India
  Lagos,16060303,1171,13712,Nigeria
  Istanbul,14160467,5461,2593,Turkey
  Tokyo,13513734,2191,6168,Japan
  Sao Paulo,12038175,1521,7914,Brazila
  Mexico City,8874724,1486,5974,Mexico
  London,8673713,1572,5431,United Kingdom
  New York City,8537673,784,10892,United States
  Bangkok,8280925,1569,5279,Thailand`

csvToTable(data)

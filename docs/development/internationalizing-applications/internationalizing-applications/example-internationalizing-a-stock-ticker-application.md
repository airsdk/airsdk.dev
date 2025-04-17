---
sidebar_position: 9
---

# Example: Internationalizing a stock ticker application

The Global Stock Ticker application retrieves and displays fictitious data about
stocks in three different stock markets: the United States, Japan, and Europe.
It formats the data according to the conventions of various locales.

This example illustrates the following features of the flash.globalization
package:

- Locale-aware number formatting

- Locale-aware currency formatting

- Setting currency ISO code and currency symbols

- Locale-aware date formatting

- Retrieving and displaying appropriate month name abbreviations

To get the application files for this sample, see
[_FlashPlatformAS3DevGuideExamples.zip_](https://github.com/joshtynjala/flash-platform-as3-dev-guide-examples/releases/tag/original).
The Global Stock Ticker application files can be found in the folder
Samples/GlobalStockTicker. The application consists of the following files:

<table>
<thead>
    <tr>
        <th><p>File</p></th>
        <th><p>Description</p></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>
            <p>GlobalStockTicker.mxml</p>
            <p>or</p>
            <p>GlobalStockTicker.fla</p>
        </td>
        <td><p>The user interface for the application for Flex (MXML) or Flash
        (FLA).</p></td>
    </tr>
    <tr>
        <td><p>styles.css</p></td>
        <td><p>Styles for the application user interface (Flex only).</p></td>
    </tr>
    <tr>
        <td><p>com/example/programmingas3/stockticker/flex/FinGraph.mxml</p></td>
        <td><p>An MXML component that displays a chart of simulated stock data,
        for Flex only.</p></td>
    </tr>
    <tr>
        <td><p>com/example/programmingas3/stockticker/flash/GlobalStockTicker.as</p></td>
        <td><p>Document class containing the user interface logic for the
        application (Flash only).</p></td>
    </tr>
    <tr>
        <td><p>comp/example/programmingas3/stockticker/flash/RightAlignedColumn.as</p></td>
        <td><p>A custom cell renderer for the Flash DataGrid component (Flash
        only).</p></td>
    </tr>
    <tr>
        <td><p>com/example/programmingas3/stockticker/FinancialGraph.as</p></td>
        <td><p>An ActionScript class that draws a chart of simulated stock
        data.</p></td>
    </tr>
    <tr>
        <td><p>com/example/programmingas3/stockticker/Localizer.as</p></td>
        <td><p>An ActionScript class that manages the locale and currency and
        handles the localized formatting of numbers, currency amounts, and
        dates.</p></td>
    </tr>
    <tr>
        <td><p>com/example/programmingas3/stockticker/StockDataModel.as</p></td>
        <td><p>An ActionScript class that holds all the sample data for the
        Global Stock Ticker example.</p></td>
    </tr>
</tbody>
</table>

## Understanding the user interface and sample data

The application's main user interface elements are:

- a combo box for selecting a Locale

- a combo box for selecting a Market

- a DataGrid that displays data for six companies in each market

- a chart that shows simulated historical data for the selected company's stock

The application stores all of its sample data about locales, markets, and
company stocks in the StockDataModel class. A real application would retrieve
data from a server and then store it in a class like StockDataModel. In this
example, all the data is hard coded in the StockDataModel class.

Note: The data displayed in the financial chart doesn't necessarily match the
data shown in the DataGrid control. The chart is randomly redrawn each time a
different company is selected. It is for illustration purposes only.

## Setting the locale

After some initial setup work, the application calls the method
Localizer.setLocale() to create formatter objects for the default locale. The
setLocale() method is also called each time the user selects a new value from
the Locale combo box.

```
public function setLocale(newLocale:String):void
{
	locale  = new LocaleID(newLocale);

	nf = new NumberFormatter(locale.name);
	traceError(nf.lastOperationStatus, "NumberFormatter", nf.actualLocaleIDName);

	cf = new CurrencyFormatter(locale.name);
	traceError(cf.lastOperationStatus, "CurrencyFormatter", cf.actualLocaleIDName);
	symbolIsSafe = cf.formattingWithCurrencySymbolIsSafe(currentCurrency);
	cf.setCurrency(currentCurrency, currentSymbol);
	cf.fractionalDigits = currentFraction;

	df = new DateTimeFormatter(locale.name, DateTimeStyle.LONG, DateTimeStyle.SHORT);
	traceError(df.lastOperationStatus, "DateTimeFormatter", df.actualLocaleIDName);
	monthNames = df.getMonthNames(DateTimeNameStyle.LONG_ABBREVIATION);
}

public function traceError(status:String, serviceName:String, localeID:String) :void
{
	if(status != LastOperationStatus.NO_ERROR)
	{
		if(status == LastOperationStatus.USING_FALLBACK_WARNING)
		{
			trace("Warning - Fallback locale ID used by "
					+ serviceName + ": " + localeID);
		}
		else if (status == LastOperationStatus.UNSUPPORTED_ERROR)
		{
			trace("Error in " + serviceName + ": " + status);
			//abort application
			throw(new Error("Fatal error", 0));
		}
		else
		{
			trace("Error in " + serviceName + ": " + status);
		}
	}
	else
	{
		trace(serviceName + " created for locale ID: " + localeID);
	}
}
```

First the setLocale() method creates a LocaleID object. This object makes it
easier to get details about the actual locale later, if needed.

Next it creates new NumberFormatter, CurrencyFormatter, and DateTimeFormatter
objects for the locale. After creating each formatter object it calls the
traceError() method. This method displays error and warning messages in the
console if there is a problem with the requested locale. (A real application
should react based on such errors rather than just tracing them).

After creating the CurrencyFormatter object, the setLocale() method sets the
formatter's currency ISO code, currency symbol, and fractionalDigits properties
to previously determined values. (Those values are set each time the user
selects a new market from the Markets combo box).

After creating the DateTimeFormatter object, the setLocale() method also
retrieves an array of localized month name abbreviations.

## Formatting the data

The formatted stock data is presented in a DataGrid control. The DataGrid
columns each call a label function that formats the column value using the
appropriate formatter object.

In the Flash version, for example, the following code sets up the DataGrid
columns:

```
var col1:DataGridColumn = new DataGridColumn("ticker");
col1.headerText = "Company";
col1.sortOptions = Array.NUMERIC;
col1.width = 200;

var col2:DataGridColumn = new DataGridColumn("volume");
col2.headerText = "Volume";
col2.width = 120;
col2.cellRenderer = RightAlignedCell;
col2.labelFunction = displayVolume;

var col3:DataGridColumn = new DataGridColumn("price");
col3.headerText = "Price";
col3.width = 70;
col3.cellRenderer = RightAlignedCell;
col3.labelFunction = displayPrice;

var col4:DataGridColumn = new DataGridColumn("change");
col4.headerText = "Change";
col4.width = 120;
col4.cellRenderer = RightAlignedCell;
col4.labelFunction = displayPercent;
```

The Flex version of the example declares its DataGrid in MXML. It also defines
similar label functions for each column.

The labelFunction properties refer to the following functions, which call
formatting methods of the Localizer class:

```
private function displayVolume(item:Object):String
{
	return localizer.formatNumber(item.volume, 0);
}

private function displayPercent(item:Object):String
{
```

       return localizer.formatPercent(item.change )  ;
```
}

private function displayPrice(item:Object):String
{
	return localizer.formatCurrency(item.price);
}
```

The Localizer methods then set up and call the appropriate formatters:

```
public function formatNumber(value:Number, fractionalDigits:int = 2):String
{
	nf.fractionalDigits = fractionalDigits;
	return nf.formatNumber(value);
}

public function formatPercent(value:Number, fractionalDigits:int = 2):String
{
	// HACK WARNING: The position of the percent sign, and whether a space belongs
	// between it and the number, are locale-sensitive decisions. For example,
	// in Turkish the positive format is %12 and the negative format is -%12.
	// Like most operating systems, flash.globalization classes do not currently
	// provide an API for percentage formatting.
	nf.fractionalDigits = fractionalDigits;
	return nf.formatNumber(value) + "%";
}

public function formatCurrency(value:Number):String
{
	return cf.format(value, symbolIsSafe);
}

public function formatDate(dateValue:Date):String
{
	return df.format(dateValue);
}
```

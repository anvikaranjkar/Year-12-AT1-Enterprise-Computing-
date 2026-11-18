/* Beginner reference: practice support, not an authorised exam aid. */
window.FORMULA_GUIDE = [
  {
    "name": "SUM",
    "category": "Summaries",
    "syntax": "=SUM(number1, [number2], ...)",
    "example": "=SUM(E2:E21)",
    "explanation": "Adds numeric values. Use a colon for an inclusive range: E2:E21 contains twenty cells. A total answers how much in all. Match the data range to the question and include units when reporting a result.",
    "pitfall": "SUM includes filtered-out rows. Use SUBTOTAL for a visible-only total. Do not accidentally include another total inside the range."
  },
  {
    "name": "AVERAGE",
    "category": "Summaries",
    "syntax": "=AVERAGE(number1, [number2], ...)",
    "example": "=AVERAGE(D2:D21)",
    "explanation": "Calculates the arithmetic mean: sum divided by the count of numeric values. It includes zero but ignores empty cells and text in a referenced range. A fractional mean is valid even when the individual observations are whole-number counts.",
    "pitfall": "Missing data is not automatically zero. A mean may conceal outliers, different group sizes or important variation."
  },
  {
    "name": "MIN",
    "category": "Summaries",
    "syntax": "=MIN(number1, [number2], ...)",
    "example": "=MIN(D2:D21)",
    "explanation": "Returns the smallest numeric value. Useful for finding the lowest delay, cost or score. Check the variable definition: a lower delay is desirable, while lower customer satisfaction may be undesirable. Interpret the result in context.",
    "pitfall": "MIN returns a value, not the order or customer attached to it. Use a filter or lookup to identify matching records."
  },
  {
    "name": "MAX",
    "category": "Summaries",
    "syntax": "=MAX(number1, [number2], ...)",
    "example": "=MAX(E2:E21)",
    "explanation": "Returns the largest numeric value. It can identify peak sales, maximum delay or the highest mark. Compare this extreme with the rest of the dataset before treating it as typical performance. Record the measurement unit alongside the answer.",
    "pitfall": "A maximum can be an error or an exceptional event. It is not a substitute for the average or a trend."
  },
  {
    "name": "COUNT",
    "category": "Summaries",
    "syntax": "=COUNT(value1, [value2], ...)",
    "example": "=COUNT(D2:D21)",
    "explanation": "Counts numeric values, including zero and date serial numbers. Use it to check how many numeric measurements are available before interpreting an average. Compare the count with the expected number of records to investigate missing or text-stored values.",
    "pitfall": "COUNT does not count text IDs. Use COUNTA for non-empty entries or COUNTIF for a specified condition."
  },
  {
    "name": "COUNTA",
    "category": "Summaries",
    "syntax": "=COUNTA(value1, [value2], ...)",
    "example": "=COUNTA(A2:A21)",
    "explanation": "Counts non-empty cells, including text, numbers and error values. It is useful for counting populated ID fields when each record should have exactly one ID. A formula returning an empty string can still count as non-empty.",
    "pitfall": "It counts populated cells, not unique people. Duplicates, spaces and formula-generated empty text may inflate the result."
  },
  {
    "name": "COUNTIF",
    "category": "Conditional summaries",
    "syntax": "=COUNTIF(range, criteria)",
    "example": "=COUNTIF(D2:D21,\">5\")",
    "explanation": "Counts cells matching one condition. Use quotation marks around text or a combined comparison such as \">5\". To use a threshold in J2, join the operator to the cell reference: =COUNTIF(D2:D21,\">\"&J2).",
    "pitfall": "At least means >=; more than means >. The distinction changes whether boundary values count."
  },
  {
    "name": "SUMIF",
    "category": "Conditional summaries",
    "syntax": "=SUMIF(range, criteria, [sum_range])",
    "example": "=SUMIF(B2:B21,\"North\",E2:E21)",
    "explanation": "Tests a criteria range and adds corresponding numbers. This example finds North revenue. Keep the label and amount ranges aligned to the same records. A cell containing the selected zone can replace the quoted label for easier reuse.",
    "pitfall": "Reversing the ranges may test amounts for a zone label. SUMIF adds values; COUNTIF counts records."
  },
  {
    "name": "AVERAGEIF",
    "category": "Conditional summaries",
    "syntax": "=AVERAGEIF(range, criteria, [average_range])",
    "example": "=AVERAGEIF(B2:B21,\"North\",D2:D21)",
    "explanation": "Tests zone labels in B and averages corresponding delays in D. Explain both roles when asked to justify your formula. Equivalent criteria in a cell make the formula reusable. The result describes the selected subset, not necessarily the whole enterprise.",
    "pitfall": "Misaligned records produce misleading results. No matching numeric values can return #DIV/0!; investigate the criterion rather than inventing a zero."
  },
  {
    "name": "IF",
    "category": "Logical rules",
    "syntax": "=IF(logical_test, value_if_true, value_if_false)",
    "example": "=IF(D2<=5,\"Within limit\",\"Over limit\")",
    "explanation": "Chooses between two outcomes. Read the condition first, then say what happens if it is true and if it is false. Test a value below, at and above the threshold. Text outputs need quotation marks.",
    "pitfall": "Do not reverse the true and false outcomes. A rule using < instead of <= treats the exact boundary differently."
  },
  {
    "name": "AND",
    "category": "Logical rules",
    "syntax": "=AND(logical1, [logical2], ...)",
    "example": "=IF(AND(D2>5,E2>100),\"Priority\",\"Standard\")",
    "explanation": "Returns TRUE only when every condition is true. Combine it with IF when a record must meet multiple requirements, such as both a long delay and high revenue. Write each comparison separately inside AND.",
    "pitfall": "AND does not mean either condition. Check a record meeting just one condition to make sure it receives the intended outcome."
  },
  {
    "name": "OR",
    "category": "Logical rules",
    "syntax": "=OR(logical1, [logical2], ...)",
    "example": "=IF(OR(D2>5,F2<3),\"Review\",\"Routine\")",
    "explanation": "Returns TRUE when at least one condition is true. Here a delay over five or a rating below three triggers review. It is also true when both conditions hold. Use it when either warning is sufficient.",
    "pitfall": "Using OR instead of AND can flag far more records. Test neither, first only, second only and both conditions."
  },
  {
    "name": "VLOOKUP",
    "category": "Lookups",
    "syntax": "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
    "example": "=VLOOKUP(\"D110\",A2:F21,5,FALSE)",
    "explanation": "Searches the first column of a table and returns a value from the same row. Count the return column within the selected table: in A:F, E is fifth. FALSE requests an exact match, appropriate for IDs.",
    "pitfall": "The lookup column must be first in the table. Lock a copied table range, such as $A$2:$F$21, and avoid approximate ID matching."
  },
  {
    "name": "INDEX",
    "category": "Lookups",
    "syntax": "=INDEX(array, row_num, [column_num])",
    "example": "=INDEX(E2:E21,3)",
    "explanation": "Returns a value at a position within a selected range. In a one-column range, position three means the third cell of that range, not worksheet row three. Pair INDEX with MATCH to retrieve values using an ID.",
    "pitfall": "The row number is relative to the array. An out-of-range position can return #REF!. Keep lookup and return arrays aligned."
  },
  {
    "name": "MATCH",
    "category": "Lookups",
    "syntax": "=MATCH(lookup_value, lookup_array, [match_type])",
    "example": "=INDEX(E2:E21,MATCH(\"D110\",A2:A21,0))",
    "explanation": "MATCH finds a relative position; INDEX returns the value at that position. The 0 requests an exact match. This combination can return a column to either side of the lookup field, making it more flexible than VLOOKUP.",
    "pitfall": "MATCH alone returns a position, not the desired revenue. Leaving out match_type can permit approximate matching."
  },
  {
    "name": "IFERROR",
    "category": "Debugging",
    "syntax": "=IFERROR(value, value_if_error)",
    "example": "=IFERROR(VLOOKUP(H2,$A$2:$F$21,5,FALSE),\"Check ID\")",
    "explanation": "Provides a readable fallback when a formula returns an error. It can help a user recognise that an input needs checking. First verify the underlying formula independently so the fallback does not conceal wrong references or missing data.",
    "pitfall": "Replacing every error with zero may silently distort totals and recommendations. Zero should represent a genuine measured zero."
  },
  {
    "name": "XLOOKUP",
    "category": "Lookups",
    "syntax": "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])",
    "example": "=XLOOKUP(H2,A2:A21,E2:E21,\"Check ID\")",
    "explanation": "Searches one range and returns the corresponding value from another. Exact matching is the default. It avoids counting return-column numbers and can search in either direction. Learn the VLOOKUP method too when a practice question explicitly asks for it.",
    "pitfall": "Availability depends on Excel version. Keep lookup and return arrays the same size; repeated IDs still need investigation."
  },
  {
    "name": "SUMIFS",
    "category": "Conditional summaries",
    "syntax": "=SUMIFS(sum_range, criteria_range1, criteria1, ...)",
    "example": "=SUMIFS(E2:E21,B2:B21,\"North\",D2:D21,\">5\")",
    "explanation": "Adds amounts for records meeting every supplied condition. This example totals revenue for North orders delayed more than five minutes. Notice that SUMIFS places the sum range first, unlike SUMIF. Check each criterion against a known row.",
    "pitfall": "All criteria combine as AND. Each criteria range must align with the sum range; the argument order differs from SUMIF."
  },
  {
    "name": "COUNTIFS",
    "category": "Conditional summaries",
    "syntax": "=COUNTIFS(criteria_range1, criteria1, ...)",
    "example": "=COUNTIFS(B2:B21,\"North\",D2:D21,\">5\")",
    "explanation": "Counts records meeting multiple conditions. It is useful for checking a two-column filter independently. Each record must satisfy both the zone and delay test. Use compatible ranges covering the same rows.",
    "pitfall": "COUNTIFS counts records, not revenue. Do not assume it represents an OR condition across different columns."
  },
  {
    "name": "AVERAGEIFS",
    "category": "Conditional summaries",
    "syntax": "=AVERAGEIFS(average_range, criteria_range1, criteria1, ...)",
    "example": "=AVERAGEIFS(D2:D21,B2:B21,\"North\",C2:C21,\">=4\")",
    "explanation": "Averages values whose corresponding records meet all conditions. Here it averages delays for North orders carrying at least four parcels. The average range comes first, followed by criteria-range and criterion pairs. Explain the subset when interpreting the result.",
    "pitfall": "The order differs from AVERAGEIF. Empty matches or no matching numeric measurements can return #DIV/0!."
  },
  {
    "name": "MEDIAN",
    "category": "Summaries",
    "syntax": "=MEDIAN(number1, [number2], ...)",
    "example": "=MEDIAN(D2:D21)",
    "explanation": "Returns the middle numeric value after ordering; for an even count it averages the two middle values. It describes a typical result when extreme delays pull the mean upwards. Compare mean and median to investigate unusual distributions.",
    "pitfall": "Median does not remove the need to inspect outliers. Report which summary you used instead of calling every typical value an average."
  },
  {
    "name": "ROUND",
    "category": "Number tools",
    "syntax": "=ROUND(number, num_digits)",
    "example": "=ROUND(AVERAGE(D2:D21),2)",
    "explanation": "Rounds a computed value to a chosen number of decimal places. Two means two digits after the decimal point; zero gives a whole number. Prefer retaining full precision during calculations and rounding the reported final result.",
    "pitfall": "Number formatting changes appearance; ROUND changes the stored formula result. Early rounding can accumulate errors."
  },
  {
    "name": "CONCATENATE",
    "category": "Text tools",
    "syntax": "=CONCATENATE(text1, [text2], ...)",
    "example": "=CONCATENATE(B2,\" - \",A2)",
    "explanation": "Joins text into a label, such as North - D101. Include spaces and punctuation explicitly inside quotes. The & operator provides a shorter equivalent: =B2&\" - \"&A2. Useful labels can make a report easier to understand.",
    "pitfall": "Joining formatted numbers may lose their displayed currency or date format. Do not use concatenated text instead of numeric values for analysis."
  },
  {
    "name": "TRIM",
    "category": "Text tools",
    "syntax": "=TRIM(text)",
    "example": "=TRIM(B2)",
    "explanation": "Removes leading and trailing ordinary spaces and reduces repeated ordinary spaces between words. Use a helper column, compare the cleaned values, and retain a raw copy. It can help apparently identical labels group or match correctly.",
    "pitfall": "TRIM does not remove every invisible character, including some non-breaking spaces. Inspect persistent lookup mismatches instead of repeatedly applying it."
  },
  {
    "name": "LEN",
    "category": "Text tools",
    "syntax": "=LEN(text)",
    "example": "=LEN(A2)",
    "explanation": "Counts characters, including spaces. Compare the lengths of supposedly identical IDs to detect unexpected characters. A useful debugging sequence is checking length, trimming ordinary spaces, then checking whether the value is text or numeric.",
    "pitfall": "A length mismatch suggests a problem but does not identify the character. Leading zeros can be significant in identifiers."
  },
  {
    "name": "LEFT",
    "category": "Text tools",
    "syntax": "=LEFT(text, [num_chars])",
    "example": "=LEFT(A2,1)",
    "explanation": "Extracts characters from the beginning of text. A first-character prefix can classify a consistently structured ID. Verify the documented ID format before relying on fixed positions, and keep the original identifier for traceability.",
    "pitfall": "A variable-length prefix or unexpected space can produce the wrong category. Extracted numeric-looking characters remain text unless explicitly converted."
  },
  {
    "name": "RIGHT",
    "category": "Text tools",
    "syntax": "=RIGHT(text, [num_chars])",
    "example": "=RIGHT(A2,3)",
    "explanation": "Extracts characters from the end of text. For D110, three characters returns 110 as text. It can help analyse a documented ID pattern, but the extracted digits are identifiers unless a meaningful arithmetic use is justified.",
    "pitfall": "Do not assume the final three characters are valid for every ID. Short or inconsistent source strings require checks."
  },
  {
    "name": "SUBTOTAL",
    "category": "Filtering",
    "syntax": "=SUBTOTAL(function_num, ref1, [ref2], ...)",
    "example": "=SUBTOTAL(109,E2:E21)",
    "explanation": "Summarises visible data after filtering. Function 109 sums and also ignores manually hidden rows; 101 calculates their average. It is useful when a question asks for the displayed subset. Ordinary SUM and AVERAGE still include filtered-out records.",
    "pitfall": "A visible-only result depends on current filters. State the subset and clear filters before answering questions about all records."
  },
  {
    "name": "Relative and absolute references",
    "category": "References",
    "syntax": "=B2*$J$2",
    "example": "=E2*(1+$J$2)",
    "explanation": "Relative references move when copied. Dollar signs lock the following part: $J$2 fixes both row and column. Store a rate in a labelled driver cell and lock its reference while allowing each record reference to move.",
    "pitfall": "Locking E2 as well would reuse one record for every row. Inspect the first and last copied formulas, not just their displayed values."
  },
  {
    "name": "Mixed references",
    "category": "References",
    "syntax": "=$B2*C$1",
    "example": "=$B2*C$1",
    "explanation": "A mixed reference locks one direction. $B2 keeps column B when copied sideways but changes row when copied down. C$1 keeps row one when copied down but changes column sideways. Useful for a grid of quantities multiplied by scenario rates.",
    "pitfall": "Place the dollar sign before the part to lock. Check one horizontal and one vertical copy to verify both directions."
  },
  {
    "name": "Cross-sheet references",
    "category": "References",
    "syntax": "=SheetName!A1",
    "example": "='Class A'!B2",
    "explanation": "An exclamation mark separates a sheet name from its cell or range. Names containing spaces need single quotes. Summary links allow source changes to flow through automatically. Keep sheet names and field meanings clear .",
    "pitfall": "A broken or renamed external workbook is different from an internal sheet link. Never assume a linked value is current without checking its source."
  }
];
window.LAB_TECHNIQUES = [
  {
    "title": "1 · Start a spreadsheet",
    "steps": [
      "Create a blank workbook in Excel Online . Rename the workbook and its first sheet . A workbook contains sheets; letters identify columns and numbers identify rows.",
      "Enter field headings in row 1, such as OrderID, Zone and Revenue. Enter one complete record per following row. Select a cell and edit its content through the cell or formula bar.",
      "Select a sensible dataset range and use a readable header style. Adjust widths so headings are visible. Format revenue as currency and counts as whole numbers. Look for the freeze-top-row option if the dataset is long."
    ],
    "check": "Click B3 and identify its column, row, field and record. Check every row has the same field structure and that saving has completed.",
    "limit": "Menu names and locations can vary by Excel version. Formatting changes how a value looks, not necessarily its underlying data type."
  },
  {
    "title": "2 · Calculate and copy formulas",
    "steps": [
      "In a new calculation column, enter a formula beginning with =, such as =C2*D2 for quantity times unit price. Press Enter and compare it with a manual calculation.",
      "Use the fill handle or copy and paste to apply the formula to the remaining data rows. Select the second formula cell and check that its row references moved.",
      "Enter a weighting or rate in a labelled driver cell, then use an absolute reference such as $J$2 when copying calculations. Add SUM, AVERAGE, MIN and MAX summaries outside the raw record range."
    ],
    "check": "Change one source value and confirm dependent formulas recalculate. Inspect the first and final copied formulas and test a rate change.",
    "limit": "When debugging, check the equals sign, argument separators, quotation marks, matching parentheses, ranges, data types and whether the input cell is formatted as text."
  },
  {
    "title": "3 · Clean and validate data",
    "steps": [
      "Keep a raw copy before making changes. Scan for missing values, implausible measurements, inconsistent dates, repeated IDs and category spelling differences. Compare suspicious records with the source before correcting them.",
      "Use helper columns such as TRIM for ordinary whitespace. Standardise known category variants only when they mean the same thing. For duplicate removal, select the whole table and choose a justified identifier or field combination.",
      "Find the data-validation feature. Restrict marks to whole numbers 0 to 100 or create a permitted-category list. Test a valid input and an invalid input. Decide how missing or exceptional values should be represented."
    ],
    "check": "Check record counts before and after cleaning. Verify that legitimate repeated names or transactions remain, and document every change.",
    "limit": "Validation can restrict allowable entries; it does not prove values are true and may not automatically repair earlier invalid entries."
  },
  {
    "title": "4 · Sort and filter safely",
    "steps": [
      "Select the entire dataset or a cell inside its recognised table. Find sorting and filtering tools. Confirm the header row is recognised before applying them.",
      "Sort revenue from largest to smallest. Check that each ID remains attached to its original zone and revenue. For a multi-level sort, choose a primary field and then a secondary field.",
      "Filter a category column, then apply a numeric condition such as delay >5 in another column. Read the visible matching IDs and record the subset. Use SUBTOTAL for visible-only summaries; clear every active filter before a whole-dataset question."
    ],
    "check": "Apply two conditions and verify each visible record satisfies both. Compare the result with a COUNTIFS formula or manual check.",
    "limit": "Sorting only one field can corrupt record relationships. Filtering hides data; it does not delete it. Ordinary SUM includes filtered-out rows."
  },
  {
    "title": "5 · Use conditional formatting",
    "steps": [
      "Select the numeric data cells without unrelated totals. Find conditional formatting and choose a simple rule suited to the purpose, such as highlighting delays greater than five.",
      "For a numeric comparison, enter the threshold carefully and choose a readable style. For formula-based rules, write the formula for the first cell or row in the selected range and use references deliberately.",
      "Add a legend or written status so colour is not the only signal. Inspect a low, boundary and high value. Review the rule manager or equivalent settings to confirm the affected range and remove conflicting rules."
    ],
    "check": "Change a source value across the threshold and confirm its appearance changes. Explain what the rule helps a manager notice.",
    "limit": "Conditional formatting changes appearance, not the underlying value. A three-colour scale is relative to the selected data and does not automatically indicate business targets."
  },
  {
    "title": "6 · Retrieve a value with a lookup",
    "steps": [
      "Identify the question’s lookup value, the column holding that value and the field to return. Inspect whether the key is unique and whether text and numeric types match.",
      "Write VLOOKUP with a table beginning at the key column, count the return column within that table and set FALSE for an exact ID match. Lock the table range if the formula will be copied.",
      "Try INDEX with MATCH(...,0) to see the same logic in two steps: find a relative position, then retrieve the corresponding value. If XLOOKUP is available, compare its separate lookup and return ranges."
    ],
    "check": "Test a known ID and a missing ID. Compare the returned value with the source row and investigate #N/A before adding IFERROR.",
    "limit": "A lookup normally returns the first matching record, so repeated IDs can hide ambiguity. A name is not automatically a unique key."
  },
  {
    "title": "7 · Choose and interpret charts",
    "steps": [
      "Begin with the enterprise question. Use bars for category comparisons, a line for time trends and a scatter plot for relationships between numeric variables. Summarise repeated categories before charting totals or averages.",
      "Select only the intended labels and measurements, then use the chart-insertion feature. Give the chart a meaningful title and clear units. Check category labels, time order and the selected data range.",
      "For bars, normally use a zero baseline. Remove unnecessary 3D effects and clutter. State a numerical comparison or pattern and explain its significance to the enterprise, while distinguishing association from a proven cause."
    ],
    "check": "Check the chart against two source values. Calculate a difference or rate and write a cautious, evidence-based takeaway.",
    "limit": "A chart can reveal a noteworthy pattern without establishing statistical significance, causation or reliable future predictions."
  },
  {
    "title": "8 · Apply rules and summarise subsets",
    "steps": [
      "Translate the wording into a condition before typing: at least means >=, at most means <=, above means > and below means <. Identify the column containing the measurement.",
      "Write IF to return useful labels, then copy it down. Use AND when every condition is required and OR when either condition is sufficient. Test below, at and above each boundary.",
      "Use COUNTIF to count matching records, SUMIF to add matching amounts or AVERAGEIF to compare group means. For each formula name the tested field, criterion and relevant numeric field. Keep the ranges aligned."
    ],
    "check": "Select three records manually and predict their rule outputs. Verify a group count or average independently before interpreting it.",
    "limit": "COUNTIF counts; SUMIF adds; AVERAGEIF averages. A plausible number can still answer the wrong question if you choose the wrong operation."
  },
  {
    "title": "9 · Build a pivot summary",
    "steps": [
      "Select the dataset, including one header row and all records. Find the pivot-table insertion feature and choose a clear destination, often a new sheet.",
      "Place a category such as Zone in Rows and a measurement such as Delay_minutes in Values. Set Values to Average if the question asks for mean delay. For order counts, use an appropriate non-empty ID field and Count.",
      "Add a second category in Columns or a report filter when useful. Check the totals and labels. If source data changes, refresh the pivot using refresh and verify its source range still includes added records."
    ],
    "check": "Manually calculate one group and compare it with the pivot. Explain why Average, Count or Sum suits the question.",
    "limit": "A numeric field may default to Sum; text may default to Count. A pivot does not automatically fix missing, duplicated or inconsistent source records."
  },
  {
    "title": "10 · Connect pivot charts and slicers",
    "steps": [
      "Create a pivot summary that answers a defined question, then select it and look for chart options. Choose a chart type appropriate to its category or time structure.",
      "If slicers are available for your table or pivot, add one for Zone. Use clear labels and leave space for selected states and the reset control.",
      "Choose one filter value and verify every intended chart, table and KPI changes consistently. If multiple pivots need the same slicer, inspect connection settings; use matching source structures where required. Clear the selection and check the full view returns."
    ],
    "check": "Record one selected subset and reconcile its chart with source values. Show the active selection near the results.",
    "limit": "Slicer creation, connections and pivot-chart features vary across Excel versions. If a control is unavailable, practise the same selection with a normal filter and summary formula."
  },
  {
    "title": "11 · Link sheets into a summary",
    "steps": [
      "Create clearly named source sheets such as ClassA and ClassB with matching headings. Add sample records and calculate totals in each source using ordinary formulas.",
      "Create a Summary sheet and enter a link such as =ClassA!A2. Link the corresponding fields across the row and copy down only as far as the intended source records. Add the second class below the first.",
      "For a sheet name containing a space, use quotes, for example ='Class A'!B2. Inspect representative links in both groups. Label the source or include a class field so identical names remain distinguishable."
    ],
    "check": "Change one source mark and confirm its summary and dependent total update. Compare source and summary record counts.",
    "limit": "Links do not automatically append future rows unless a suitable expanding structure is deliberately used. Do not confuse internal sheet links with external workbook links."
  },
  {
    "title": "12 · Use forms and reports",
    "steps": [
      "Separate data entry from data presentation. Design an entry area with clear field labels, meaningful number formats and validation for required categories or ranges. Explain what each field means.",
      "In a spreadsheet, a layout that looks like a form does not automatically append records to a database or another sheet. Enter records into a defined table or use a connected form workflow where authorised.",
      "Create a Report sheet containing selected links, totals or averages from the source table. Include the period, units and intended audience. Verify reported figures against the source and prevent accidental overwriting of formula cells when appropriate."
    ],
    "check": "Enter a trial record through the actual workflow and confirm where it is stored. Reconcile a report total with source records.",
    "limit": "Distinguish a formatted input template from a working automated form. Features, permissions and connected-form options depend on the platform."
  },
  {
    "title": "13 · Explore what-if scenarios",
    "steps": [
      "Identify a driver you can change, such as price, bookings or a levy, and an outcome. Store each assumption in a labelled cell and reference it from the calculation.",
      "Record a base case, then change one driver at a time and compare outcomes. For multiple scenarios, make an assumptions table so the base, lower-demand and higher-demand cases remain visible.",
      "For a target outcome, rearrange a simple formula manually: if revenue = price × bookings, required bookings = target revenue / price. Round up if whole bookings are needed and explain constraints such as capacity."
    ],
    "check": "Restore the base assumptions and verify the original result. State which assumptions were held constant and their realism.",
    "limit": "Goal Seek and Scenario Manager availability varies and may require desktop Excel. Use manual driver cells here; scenarios illustrate consequences of assumptions rather than guaranteed forecasts."
  },
  {
    "title": "14 · Plan a useful dashboard",
    "steps": [
      "Name the audience and decision before drawing anything: for example, a dispatch manager deciding where to investigate delays. Identify a small set of measures that directly support that decision.",
      "Sketch a simple hierarchy with the most useful KPIs first, a clear comparison or trend chart next, and a detail table for checking evidence. Define each metric, its unit, date range and source.",
      "Choose only filters that serve real questions. Plan visible selected states, a reset option, readable labels, adequate contrast and meaning beyond colour. Consider a narrow screen and a keyboard user while deciding the layout."
    ],
    "check": "Explain how each proposed item supports the audience’s task. Remove one item that adds clutter without informing the decision.",
    "limit": "More charts do not automatically create a better dashboard. Targets and traffic-light thresholds must have a stated business meaning."
  },
  {
    "title": "15 · Build and reconcile a dashboard",
    "steps": [
      "Prepare clean source data and reliable summary formulas or pivots before arranging visuals. Keep raw data, calculations and presentation areas distinct enough to check and maintain.",
      "Create KPI values and charts from the summaries. Add informative titles, units, period and refresh information. Arrange related measures consistently and leave enough space for labels without shrinking the text excessively.",
      "Add available filters or slicers, then test each selection. Confirm the intended KPIs, charts and detail table use the same scope. Review the unfiltered view and at least two subsets, comparing displayed values with independently calculated examples."
    ],
    "check": "Reconcile a displayed total and group average with source records. Verify chart sources after adding a new record or refreshing the data.",
    "limit": "An attractive layout can still mislead if periods, denominators, aggregation methods or filter connections differ. Document any intentional difference in scope."
  },
  {
    "title": "16 · Evaluate and improve a dashboard",
    "steps": [
      "Choose observable criteria: correct figures, time to find a value, readability, useful filtering, accessibility and ability to make the intended decision. Avoid vague claims such as it looks professional without evidence.",
      "Give a user a task, such as finding the zone with the highest late-order rate. Observe errors, hesitation and filter confusion. Test a narrow screen and keyboard navigation where relevant.",
      "Make one justified improvement, then repeat the same task and compare results. Evaluate AI-generated suggestions against figures and limitations. Write a recommendation with an action, supporting numbers, enterprise impact and a qualification."
    ],
    "check": "Report a concrete before/after observation, such as clearer units or fewer steps, and verify that the improved design remains numerically accurate.",
    "limit": "A simulated test is evidence about that simulation, not proof of real-world performance. Check proposed system changes for training, cost, integration, security and fallback needs."
  }
];

---
sidebar_position: 7
---

# Sorting and comparing strings

Collation is the process of arranging things in their proper order. Collation
rules vary significantly by locale. The rules also differ if you are sorting a
list or matching similar items, such as in a text search algorithm.

When sorting, small differences such as upper and lowercase letters or diacritic
marks such as accents, are often significant. For example, the letter ö (o with
a diaeresis) is considered mostly equivalent to the plain letter o in French or
English. The same letter, however, follows the letter z in Swedish. Also, in
French and some other languages, the last accent difference in a word determines
its order in a sorted list.

When searching, you often want to ignore differences in case or diacritics, to
increase the chance of finding relevant matches. For example, a search for the
characters "cote" in a French document conceivably returns matches for "cote",
"côte", and "coté".

## Using the Collator class

The main methods of the Collator class are the compare() method, used primarily
for sorting, and the equals() method, used for matching values.

The following example shows the different behavior of the compare() and equals()
methods.

    var words:Array = new  Array("coté", "côte");

    var sorter:Collator = new Collator("fr-FR", CollatorMode.SORTING);
    words.sort(sorter.compare);
    trace(words); // côte,coté

    var matcher:Collator = new Collator("fr-FR", CollatorMode.MATCHING);
    if (matcher.equals(words[0], words[1]))
    {
    	trace(words[0] + " = " + words[1]); // côte = coté
    }

The example first creates a Collator object in SORTING mode for the
French-France locale. Then it sorts two words that differ only by diacritical
marks. This shows that the SORTING comparison distinguishes between accented and
non-accented characters.

The sorting is performed by passing a reference to the Collator object's sort()
method as a parameter to the Array.sort() method. This technique is one of the
most efficient ways of using a Collator object to control sort order.

The example then creates a Collator object in MATCHING mode. When that Collator
object compares the two words, it treats them as equal. That shows that the
MATCHING comparison values accented and non-accented characters the same.

## Customizing the behavior of the Collator class

By default, the Collator class uses string comparison rules obtained from the
operating system based on the locale and the user's system preferences. You can
customize the behavior of the compare() and equals() methods by explicitly
setting various properties. The following table lists the properties and the
effect they have upon comparisons:

| Collator Property    | Effect                                                                                                                            |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| numericComparison    | Controls whether digit characters are treated as numbers or as text.                                                              |
| ignoreCase           | Controls whether uppercase and lowercase differences are ignored.                                                                 |
| ignoreCharacterWidth | Controls whether full-width and half-width forms of some Chinese and Japanese characters are evaluated as equal.                  |
| ignoreDiacritics     | Controls whether strings that use the same base characters but different accents or other diacritic marks are evaluated as equal. |
| ignoreKanaType       | Controls whether strings that differ only by the type of kana character being used are treated as equal.                          |
| ignoreSymbols        | Controls whether symbol characters such as spaces, currency symbols, math symbols, and others are ignored.                        |

The following code shows that setting the ignoreDiacritics property to true
changes the sort order of a list of French words:

    var words:Array = new  Array("COTE", "coté", "côte", "Coté","cote");
    var sorter:Collator = new Collator("fr-CA", CollatorMode.SORTING);
    words.sort(sorter.compare);
    trace(words); // cote,COTE,côte,coté,Coté

    sorter.ignoreDiacritics = true;
    words.sort(sorter.compare);
    trace(words); // côte,coté,cote,Coté,COTE

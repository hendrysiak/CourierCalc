# Kalkulator kurierski v0.06

Aplikacja stworzona na bazie doświadczeń.

Wykorzystuje techniki programowania OOP w JavaScript

Podstawowe założenia:

1. Aplikacja przyjmuje od użytkownika informacje, na temat wymiarów i wagi przesyłki.
2. Waliduje formularz w sposób kompleksowy, wyświetlając ostrzeżenia (wykorzystanie dwóch flag).
3. Renderuje wskaźniki z cenami.

Wersja 0.05 jest 5 odsłoną aplikacji, pierwszą, zamieszczoną w publicznym repozytorium.

Zastosowane technologie:

1. HTML,
2. JS (ES6 - OOP w oparciu o class, modułowość)

Zastosowane rozwiązania:

1. Podział projektu na moduły, składające się z osobnych obiektów.

2. Klasy reprezentujące firmy kurierskie dziedziczą z klasy ogólnej (pierwotnie pisanej dla firmy InPost).

3. Klasa Calculator:
   a) pobranie obiektów do pracy,
   b) przygotowanie listy uruchomionych usług,
   c) wygenerowanie paczki z wymiarów wpisanych w formularzu,
   d) rozbudowana walidacja formularza (dane sprawdzane dwoma flagami):
   -żadne pole nie może zostać pozostawione puste,
   -żaden wymiar nie może przekroczyć 200 cm,
   -waga nie może przekroczyć 50 kg,
   -suma wymiarów nie może przekroczyć 300 cm,

4. Klasa Courier + warianty:
   a) liczy wagę i ocenia, czy przyjmujemy wagę zwykłą czy gabarytową (przyjmuje inne wersje, w zależności od kuriera - dzielnik + wzór obliczania)
   b) liczy ceny usług dodatkowych,
   c) dolicza dopłaty do wagi gabarytowej,
   d) ustala cenę, stanowiącą połączenie powyższych danych,
   e) renderuje cenę,
   Każdy wariant ma inne wzory, dzielniki oraz ceny.

5. Klasa System - pobiera dane i renderuje propozycje cenowe

Wersja 0.06 - zmiany:

1. Klasa Calculator:
   a) dodano walidację, weryfikującą, czy przesyłka jest niestandardowa; musi spełniać warunki (w przeciwnym wypadku wyskoczy ostrzeżenie):
   -którykolwiek z wymiarów musi przekroczyć 120 cm,
   -suma wymiarów musi przekroczyć 220 cm,
2. Klasa System:
   a) dodano w construktorze metodę pobierania danych,
   b) ceny kurierów będą pobierane za pomocą API - w oparciu o nie, będą renderowane propozycje cenowe,

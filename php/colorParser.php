<?php

$handle = fopen("../data/txt/diassemana.txt", "r");
if ($handle) {
	$colorsArray = [];
	$colorData = [];
	$index = 0;
	while (($line = fgets($handle)) !== false) {
		if (!trim($line)) {
			$colorsArray[] = $colorData;
			$colorData = [];
			$index = 0;
			continue;
		}
		if ($index == 0) {
			$colorData['espa'] = trim($line);
			$index++;
			continue;
		}
		if ($index == 1) {
			$colorData['ucra'] = trim($line);
			$index++;
			continue;
		}
		if ($index == 2) {
			$colorData['phoneme'] = substr(trim($line), 1, -1);
			$index++;
			continue;
		}
	}
	fclose($handle);
}

$json = json_encode($colorsArray, JSON_PRETTY_PRINT | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
echo $json;
// file_put_contents('alphabet.json', json_encode($json));

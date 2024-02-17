<?php

$handle = fopen("../data/alphabet.txt", "r");
if ($handle) {
	$alphabetArray = [];
	while (($line = fgets($handle)) !== false) {
		// $words = preg_split('/\s+/', trim($line));
		$words = preg_split('/\t+/', trim($line));
		list($mayus, $minus) = preg_split('/\s+/', trim($words[0]));
		list($ucra, $fone) = preg_split('/\s+/', trim($words[4]));
		$alphabetArray[] = [
			'capital' => $mayus,
			'lower' => $minus,
			'ucra' => $ucra,
			'phoneme' => $fone
		];
	}
	fclose($handle);
}

$json = json_encode($alphabetArray, JSON_PRETTY_PRINT | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
echo $json;
// file_put_contents('alphabet.json', json_encode($json));

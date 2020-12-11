<?php

class Templating
{
	public $rawTemplate = '';
	public $components = [];

	function __construct(string $templateName)
	{
		$path = self::filepath($templateName);
		$html = file_get_contents($path);
		$this->rawTemplate = $html;
	}

	function add($componentName, $content)
	{
		$this->components[$componentName] .= $content;
	}

	function addView($componentName, $viewName)
	{
		$path = self::filepath($viewName);
		$this->components[
			$componentName
		] .= file_get_contents($path);
	}

	function render()
	{
		$html = $this->rawTemplate;
		foreach (
			$this->components
			as $componentName => $componentHtml
		) {
			$html = str_replace(
				'{{' . $componentName . '}}',
				$componentHtml,
				$html
			);
		}
		return $html;
	}

	static function filepath($templateName)
	{
		$path =
			__DIR__ .
			'/templates/' .
			$templateName .
			'.html';
		return $path;
	}
}

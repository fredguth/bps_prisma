<script>
	import { LayerCake, ScaledSvg, Html, takeEvery } from 'layercake'
	import { extent, bin, median, deviation } from 'd3-array'
	import { scaleBand } from 'd3-scale'
	import { format, formatLocale } from 'd3-format'

	import Column from './Column.svelte'
	import AxisX from './AxisX.html.svelte'
	import AxisY from './AxisY.html.svelte'

	import calcThresholds from './calcThresholds.js'

	export let data


	let binCount = 100

	const xKey = ['x0', 'x1']
	const yKey = 'length'

	const baseDomain = extent(data)
	const mediana = median(data)
	const desvio = deviation(data) || 0
	const domain = [Math.max(mediana - desvio/2, baseDomain[0]), Math.min(mediana + desvio/2, baseDomain[1])];
	// const domain = baseDomain

	$: steps = calcThresholds(domain, binCount)
	// $: console.log({ steps })
	$: hist = bin().domain(domain).thresholds(steps)

	$: slimSteps = takeEvery(steps, 7)
</script>



<div class="chart-container relative">
	<div class="absolute z-10 right-0 w-32 mr-1">
		<input
			style="margin:0;"
			type="range"
			min="4"
			max="200"
			step="4"
			bind:value={binCount}
		/>
		<span
			class="counter-container"
			style="display:inline-block;vertical-align:top;width: 120px;text-align:right;"
			>{binCount} intervalos</span
		>
	</div>
	<LayerCake
		ssr={true}
		percentRange={true}
		padding={{ top: 20, right: 5, bottom: 20, left: 31 }}
		x={xKey}
		y={yKey}
		xDomain={steps}
		xScale={scaleBand().paddingInner(0)}
		yDomain={[0, null]}
		data={hist(data)}
	>
		<Html>
			<AxisX
				gridlines={false}
				baseline={true}
				ticks={slimSteps}
        formatTick={(d) => `R$ ${format(',.4f')(d)}`}
			/>
			<AxisY gridlines={false} ticks={3} />
		</Html>
		<ScaledSvg>
			<Column fill={'#fff'} stroke={'#000'} strokeWidth={1} />
		</ScaledSvg>
	</LayerCake>
</div>

<style>
	/*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
	.chart-container {
		width: 100%;
		height: 250px;
	}

	input {
		height: auto;
	}
</style>

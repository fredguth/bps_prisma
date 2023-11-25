<script lang="ts">
	import { Button } from "$lib/components/ui/button";
</script>

<div
	class="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<div
		class="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex"
	>
		<div
			class="absolute inset-0 bg-cover"

		/>
		<div class="relative z-20 flex items-center text-lg font-medium">
			O BPS é referência nacional para a pesquisa e cotação de preços de medicamentos e produtos para a saúde, podendo ser consultado de forma gratuita por qualquer cidadão, órgão ou instituição pública ou privada.
		</div>
		<div class="relative z-20 mt-auto">
			<blockquote class="space-y-2">
				<h4 class="font-semibold">Uso Obrigatório em Licitações de Medicamentos</h4>
				<p class="text-xs">
					Em junho de 2017 foi publicada a Resolução nº 18 da Comissão Intergestores Tripartite que tornou obrigatória a utilização do BPS pelos estados, municípios e distrito federal. Para cumprir com as determinações da Resolução, as instituições de saúde que realizam licitações de medicamentos deverão possuir um cadastro no BPS de forma que consigam fazer a inserção das informações de suas compras no sistema. Inicialmente será obrigatória informar no BPS apenas as compras de medicamentos. A data para inserção de materiais e produtos para a saúde será pactuada oportunamente.
				</p>
				<p class="text-xs"><a href="mailto:bps@saude.gov.br?subject=Nome%20da%20institui%C3%A7%C3%A3o.%20ex%3A%20Prefeitura%20de%20...&body=Dados%20Institucionais%3A%0A1%29%20Nome%20da%20Institui%C3%A7%C3%A3o%3A%0A%0A2%29%20CNPJ%20da%20Institui%C3%A7%C3%A3o%3A%0A%0ADados%20Usu%C3%A1rio%3A%0A3%29%20Perfil%20Desejado%3A%0A%28%20%29%20Respons%C3%A1vel%20Institui%C3%A7%C3%A3o%20%28%20%29%20Operador%20Institui%C3%A7%C3%A3o%0A4%29%20CPF%3A%0A%0A5%29%20Nome%20Completo%3A%0A%0A6%29%20Data%20de%20Nascimento%3A%0A%0A7%29%20E-mail%3A%0A%0A8%29%20Telefone%3A%0A%0AValida%C3%A7%C3%A3o%20de%20Informa%C3%A7%C3%A3o%3A%0A9%29%20As%20informa%C3%A7%C3%B5es%20prestadas%20nesse%20formul%C3%A1rio%20s%C3%A3o%20verdadeiras%20e%0Areferentes%20aos%20meus%20dados%20pessoais%3A%0A%28%20%29%20confirmo%20%28%20%29%20n%C3%A3o%20confirmo%0AData.">Formulário de Cadastro</a>
				</p>
			</blockquote>
		</div>
	</div>
	<div class="lg:p-8">
		<div
			class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
		>
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">
					Identifique-se no BPS
				</h1>
				<!-- <p class="text-sm text-muted-foreground">
					Use o login único do <b>gov.br</b>.
				</p> -->
			</div>
			<!-- <Button href="/api/oauth/google">
				Use o login único <b>&nbsp;gov.br</b>
			</Button> -->
			<Button href="/material">
				Use o login único <b>&nbsp;gov.br</b>
			</Button>
			<p class="px-8 text-center text-sm text-muted-foreground">
				Ao clicar, você concorda com nossos {" "}
				<a
					href="/termos"
					class="underline underline-offset-4 hover:text-primary"
				>
					Termos de Serviço
				</a>{" "}
				e{" "}
				<a
					href="/privacidade"
					class="underline underline-offset-4 hover:text-primary"
				>
					Política de Privacidade
				</a>
				.
			</p>
		</div>
	</div>
</div>
<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>
<main class="text-zinc-800 flex-grow text-sm flex bg-white">
    <div class="px-10 flex">
      <div class="flex-wrap flex">
        <div></div>
        <div class="flex-grow px-5">
          <div class="text-xs font-medium relative inline-grid">
            <ul class="items-center flex list-none">
              <li class="items-center flex">
                <a href="https://cdpn.io/javascript:void(0)" style="text-wrap: nowrap;" class="text-blue-800 items-center text-lg font-semibold justify-center px-1.5 relative text-center text-ellipsis flex rounded-full"><i class="cursor-pointer font-black"></i></a>
              </li>
              <li class="items-center flex"><i class="text-stone-300 font-black text-center"></i><a href="https://cdpn.io/javascript:void(0)" style="text-wrap: nowrap;" class="text-blue-800 px-1.5 text-ellipsis">Tela Anterior</a></li>
              <li class="items-center flex"><i class="text-stone-300 font-black text-center"></i><a href="https://cdpn.io/javascript:void(0)" style="text-wrap: nowrap;" class="text-blue-800 px-1.5 text-ellipsis">Tela Anterior2</a></li>
              <li class="items-center flex"><i class="text-stone-300 font-black text-center"></i><a href="https://cdpn.io/javascript:void(0)" style="text-wrap: nowrap;" class="text-blue-800 px-1.5 text-ellipsis">Tela Anterior3</a></li>
              <li class="items-center flex"><i class="text-stone-300 font-black text-center"></i><a href="https://cdpn.io/javascript:void(0)" style="text-wrap: nowrap;" class="text-blue-800 px-1.5 text-ellipsis">Tela Anterior4</a></li>
              <li class="items-center flex"><i class="text-stone-300 font-black text-center"></i><span style="text-wrap: nowrap;" class="pl-2">Tela Atual</span></li>
            </ul>
          </div>
          <div class="pl-4">
            <h1 class="text-[2.63rem] leading-none font-light">Título h1</h1>
            <p class="text-lg">Parágrafo de exemplo <a href="https://cdpn.io/" class="text-blue-800 underline">link de exemplo</a>.</p>
            <h2 class="text-4xl pb-5">Título h2</h2>
            <h3 class="text-3xl font-medium">Título h3</h3>
            <h4 class="text-[1.63rem] leading-8 font-semibold">Título h4</h4>
            <h5 class="text-[1.38rem] leading-7 font-bold pb-2 uppercase">Título h5</h5>
            <h6 class="text-lg font-extrabold pb-2 uppercase">Título h6</h6>
            <div class="flex-wrap flex">
              <div class="px-5">
                <ul class="pl-10 list-disc">
                  <li class="list-item">item sem ordenação</li>
                  <li class="list-item">item sem ordenação</li>
                  <li class="list-item">item sem ordenação</li>
                </ul>
              </div>
              <div class="px-5">
                <ol class="list-decimal pl-10">
                  <li class="list-item">item ordenado</li>
                  <li class="list-item">item ordenado</li>
                  <li class="list-item">item ordenado</li>
                </ol>
              </div>
            </div>
            <div class="flex-wrap flex">
              <div class="flex-grow px-5">
                <div>
                  <div class="text-lg font-semibold table">Nome Completo (Legend)</div>
                  <div class="flex-wrap flex">
                    <div class="basis-7/12 px-5">
                      <div class="relative">
                        <label class="font-semibold">Nome</label>
                        <input value="Fulano (input preenchido)" type="text" class="cursor-text text-lg font-medium px-4 w-96 h-10 border-2 border-zinc-500 border-solid rounded" />
                      </div>
                    </div>
                    <div class="basis-7/12 px-5">
                      <div class="relative">
                        <label class="font-semibold">Sobrenome</label>
                        <input type="text" placeholder="Placeholder" class="cursor-text text-lg font-medium px-4 w-96 h-10 border-2 border-zinc-500 border-solid rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-grow px-5">
                <div>
                  <div class="text-lg font-semibold table">Outros Dados (Legend)</div>
                  <div class="flex-wrap flex">
                    <div class="basis-7/12 px-5">
                      <div class="relative">
                        <label class="font-semibold">CPF</label>
                        <input type="text" placeholder="Placeholder" class="cursor-text text-lg font-medium px-4 w-96 h-10 border-2 border-zinc-500 border-solid rounded" />
                      </div>
                    </div>
                    <div class="basis-7/12 px-5">
                      <div class="relative">
                        <label class="font-semibold">Senha</label>
                        <input type="password" placeholder="Digite sua senha" class="cursor-text text-lg font-medium pl-4 pr-10 w-96 h-10 border-2 border-zinc-500 border-solid rounded" />
                        <button style="text-wrap: nowrap;" class="text-blue-800 items-center cursor-pointer float-right text-lg font-semibold justify-center relative text-center flex w-8 h-8 rounded-full"><i class="font-black"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-wrap flex">
              <div class="flex-grow px-5 flex">
                <div>
                  <div class="px-4 pt-4">Card de exemplo 1</div>
                  <div class="p-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus dignissimos, recusandae at accusamus autem error hic adipisci eligendi eum debitis dolores magnam quod sint doloribus omnis vitae placeat. Natus, minus.</div>
                </div>
              </div>
              <div class="flex-grow px-5 flex">
                <div>
                  <div class="px-4 pt-4">Card de exemplo 2</div>
                  <div class="p-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis culpa inventore mollitia vitae a nesciunt reiciendis incidunt, labore repudiandae voluptate nisi. Numquam illo est maiores doloribus recusandae rem inventore ea?</div>
                </div>
              </div>
              <div class="flex-grow px-5 flex">
                <div>
                  <div class="px-4 pt-4">Card de exemplo 3</div>
                  <div class="p-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam cupiditate nihil facere autem dignissimos ex beatae labore? Fuga consequuntur consectetur voluptatum incidunt, tenetur, dolore magnam inventore hic iusto amet ipsa.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
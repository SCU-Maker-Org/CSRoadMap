interface HomePageProps {
  onStart: () => void;
}

export function HomePage({ onStart }: HomePageProps) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center px-4 py-12 sm:px-6">
      <section className="w-full">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-blue-700">
            学习路线图
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950 sm:text-6xl">
            CS Roadmap
          </h1>
          <p className="mt-5 text-xl leading-8 text-slate-700">
            给计算机新生使用的学习路线图
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            选择方向，查看路线，点亮已掌握技能，记录自己的学习进度。
          </p>

          <button
            type="button"
            onClick={onStart}
            className="mt-8 rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            开始查看 Roadmap
          </button>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {["选择方向", "查看路线", "点击节点", "保存进度"].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-950">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

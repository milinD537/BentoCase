"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { createSwapy } from "swapy"

type Child = {
	col: number
	colSpan?: number
	row: number
	rowSpan?: number
}

export default function Home() {
	const [columns, setColumns] = useState<number>(3)
	const [rows, setRows] = useState<number>(3)
	const [children, setChildren] = useState<number>(0)
	const swapyContainerRef = useRef<HTMLDivElement>(null)

	const gridCols = `grid-cols-[repeat(${columns},1fr)]`
	const gridRows = `grid-rows-[repeat(${rows},1fr)]`

	// useEffect(() => {
	// 	if (swapyContainerRef.current) {
	// 		const swapy = createSwapy(swapyContainerRef.current, {
	// 			animation: "dynamic",
	// 		})
	// 		swapy.enable(true)
	// 	}
	// }, [columns, children])

	return (
		<div className="pageWrapper | min-h-svh grid grid-rows-[auto_1fr_auto] place-items-center">
			<header className="">
				<h1 className="text-6xl font-semibold">Bento Case</h1>
			</header>
			<main className="w-full">
				<div className="text-xl font-medium flex gap-4 justify-center">
					<div className="inline-flex items-center gap-1">
						<p>Columns: </p>
						<div className="flex gap-2">
							<button
								onClick={() =>
									setColumns(() =>
										columns ? columns - 1 : columns
									)
								}
							>
								-
							</button>
							<span>{columns}</span>
							<button onClick={() => setColumns(columns + 1)}>
								+
							</button>
						</div>
					</div>
					<div className="inline-flex items-center gap-1">
						<p>Rows: </p>
						<div className="flex gap-2">
							<button
								onClick={() =>
									setRows(() => (rows ? rows - 1 : rows))
								}
							>
								-
							</button>
							<span>{rows}</span>
							<button onClick={() => setRows(rows + 1)}>+</button>
						</div>
					</div>
					<div className="inline-flex items-center gap-1">
						<p>Children: </p>
						<div className="flex gap-2">
							<button
								onClick={() =>
									setChildren(() =>
										children ? children - 1 : children
									)
								}
							>
								-
							</button>
							<span>{children}</span>
							<button onClick={() => setChildren(children + 1)}>
								+
							</button>
						</div>
					</div>
				</div>
				<section
					ref={swapyContainerRef}
					className={`swapyContainer | grid ${gridCols} gap-6 p-4 auto-rows-[1fr] ~grid-cols-[repeat(2,1fr)] max-w-[1366px] mx-auto min-h-[768px] bg-white/5 rounded-3xl`}
					style={{
						gridTemplateColumns: `repeat(${columns}, 1fr)`,
					}}
				>
					{Array.from({ length: rows * columns }).map((_, index) => (
						<div
							className="border-2 border-dashed rounded-lg grid place-items-center"
							key={index}
							// data-swapy-slot={`slot-${index + 1}`}
						>
							<button className="text-3xl font-bold">+</button>
							{/* <div
								data-swapy-item={`item-${index + 1}`}
								className="w-full h-full grid place-items-center hover:cursor-grab active:cursor-grabbing bg-gradient-to-b from-[#E4DED8] to-[#7E7B77] rounded-[inherit] text-2xl font-bold text-background"
							>
								{index + 1}
							</div> */}
						</div>
					))}
				</section>
			</main>
			<footer></footer>
		</div>
	)
}

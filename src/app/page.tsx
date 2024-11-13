"use client"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Grid } from "lucide-react"
import React, { useState } from "react"
import ReactDOMServer from "react-dom/server"
import pretty from "pretty"
import { codepen, CopyBlock } from "react-code-blocks"
type Grid = number | number[] | Grid[]

function KeyFrag({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}

export default function Page() {
	const [grid, setGrid] = useState<Grid[]>([0])
	const [elements, setElements] = useState<Record<string, number>>({})

	function getElement({ path }: { path: number[] }) {
		return path.reduce((prev, current) => {
			return prev[current] as Grid[]
		}, grid as Grid[])
	}

	function setElement({ path, element }: { path: number[]; element: Grid }) {
		const newArray = JSON.parse(JSON.stringify(grid))
		// Navigate to the parent of the target element
		const lastIndex = path.pop()
		const parent = path.reduce((current, index) => current[index], newArray)
		if (!lastIndex && lastIndex !== 0) {
			return
		}
		// Set the new value
		parent[lastIndex] = element
		setGrid(newArray)
	}

	function expand({ path }: { path: number[] }) {
		let element = getElement({ path })

		if (!path.length) {
			setGrid((prev) => [...prev, 0])
			return
		}
		if (Array.isArray(element)) {
			element.push(0)
		} else {
			element = [0, 0]
		}
		setElement({ path, element })
	}

	function onResize(e: number, path: number[]) {
		setElements((prev) => ({
			...prev,
			[path.join("")]: e,
		}))
	}

	function renderItems({
		col,
		path,
		isLast,
	}: {
		col: Grid
		path: number[]
		isLast?: boolean
	}) {
		return Array.isArray(col) ? (
			<>
				<ResizablePanel
					onResize={(e) => onResize(e, path)}
					className="bg-transparent"
				>
					<ResizablePanelGroup
						direction={
							path.length % 2 === 0 ? "horizontal" : "vertical"
						}
					>
						{col.map((row, rIdx) => (
							<KeyFrag key={rIdx}>
								{renderItems({
									col: row,
									path: [...path, rIdx],
									isLast: rIdx === col.length - 1,
								})}
							</KeyFrag>
						))}
					</ResizablePanelGroup>
				</ResizablePanel>
				{!isLast && <ResizableHandle />}
			</>
		) : (
			<>
				<ResizablePanel onResize={(e) => onResize(e, path)}>
					<button
						onClick={() =>
							expand({ path: path.slice(0, path.length - 1) })
						}
					>
						Sibling
					</button>
					<button onClick={() => expand({ path })}>Split</button>
				</ResizablePanel>
				{!isLast && <ResizableHandle />}
			</>
		)
	}

	const renderGrid = (grid: Grid, path: number[]) => {
		const isCol = path.length % 2 === 1
		const p = path.join("")
		return (
			<div
				className="conditionCard | has-[.conditionCard]:contents lg:has-[.conditionCard]:flex | [&:not(:has(.conditionCard))]:border-4 [&:not(:has(.conditionCard))]:p-2 | gap-4 h-full w-full flex rounded-2xl text-center justify-center items-center"
				style={
					isCol
						? {
								flexDirection: "column",
								flexBasis: `${elements[p]}%`,
						  }
						: {
								flexBasis: `${elements[p]}%`,
						  }
				}
			>
				{Array.isArray(grid)
					? grid.map((g, i) => (
							<KeyFrag key={i}>
								{renderGrid(g, [...path, i])}
							</KeyFrag>
					  ))
					: p}
			</div>
		)
	}

	const copyBlockProps = {
		text: pretty(`<div className="bentoWrapper | w-full max-w-screen-2xl aspect-video grid gap-4 overflow-auto">
								${ReactDOMServer.renderToString(renderGrid(grid, [])).replaceAll(
									"class",
									"className"
								)}
							</div>`),
		theme: codepen,
		language: "html",
		showLineNumbers: true,
		startingLineNumber: 1,
		wrapLines: false,
		wrapLongLines: false,
	}

	return (
		<>
			<section className="min-h-svh grid place-items-center">
				<div className="max-w-screen-2xl w-full aspect-video resize-y overflow-auto">
					<ResizablePanelGroup direction="horizontal">
						{grid.map((col, cIdx) => (
							<KeyFrag key={cIdx}>
								{renderItems({
									col,
									path: [cIdx],
									isLast: cIdx == grid.length - 1,
								})}
							</KeyFrag>
						))}
					</ResizablePanelGroup>
				</div>
			</section>
			<section className="min-h-svh grid place-items-center p-4">
				<div className="bentoWrapper | w-full max-w-screen-2xl aspect-video grid gap-4 resize-y overflow-auto">
					{renderGrid(grid, [])}
				</div>
			</section>
			<section className="min-h-svh grid place-items-center p-4">
				{/* <div className="w-full overflow-x-auto bg-[#222]"> */}
				<CopyBlock
					{...copyBlockProps}
					customStyle={{
						width: "100%",
						overflowX: "auto",
						display: "grid",
					}}
				/>
				{/* </div> */}
			</section>
		</>
	)
}

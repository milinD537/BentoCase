"use client"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable"
import React, { useEffect, useState } from "react"

type Grid = number | number[] | Grid[]

export default function Page() {
	const [grid, setGrid] = useState<Grid[]>([
		1,
		[[211, [2121, 2122, 2123, 2124]], 22],
		3,
	])

	/*
		[1, [[211, 212], 22], 3]
		[[211, 212], 22]
		[211, 212]
		212

		// column add
		[[[111, 112, 113], [121, 122, 123], 13], 2, 3]

		copy[1][0][1]
	*/

	function getElement({ elem }: { elem: number }) {
		return String(elem)
			.split("")
			.reduce((prev, current) => {
				console.log({
					prev,
					current,
				})

				return prev[Number(current) - 1] as Grid[]
			}, grid as Grid[])
	}

	function setElement({ elem, element }: { elem: number; element: Grid }) {
		console.log({ elem, element })

		const newArray = JSON.parse(JSON.stringify(grid))
		const path = String(elem)
			.split("")
			.map((v) => Number(v))
		// Navigate to the parent of the target element
		const lastIndex = path.pop()
		const parent = path.reduce(
			(current, index) => current[index - 1],
			newArray
		)
		if (!lastIndex) {
			console.log("error")
			return
		}
		// Set the new value
		parent[lastIndex - 1] = element

		console.log(newArray)

		setGrid(newArray)
	}

	function expand({ elem }: { elem: number }) {
		let element = getElement({ elem })
		console.log({ element })

		if (Array.isArray(element)) {
			element.push(elem * 10 + element.length + 1)
		} else {
			element = []
			element.push(elem * 10 + element.length + 1)
			element.push(elem * 10 + element.length + 1)
		}
		console.log({ elem, element })
		setElement({ elem, element })
	}

	useEffect(() => {
		expand({ elem: 212 })
	}, [])

	function columnAdd({ elem }: { elem: number }) {
		// setGrid((prev) => [...prev, [prev.length]])
		// 112
	}
	// function rowAdd({ col }: { col: number }) {
	// 	const copy = [...grid]
	// 	copy[col].push(copy[col].length)
	// 	setGrid(copy)
	// }

	function renderItems({ col, path }: { col: Grid; path: number[] }) {
		return Array.isArray(col) ? (
			Array.isArray(col[0]) ? (
				<>
					<ResizablePanel className="bg-transparent">
						<ResizablePanelGroup direction="vertical">
							{renderItems({ col, path })}
							<button>Add</button>
						</ResizablePanelGroup>
					</ResizablePanel>
					<ResizableHandle />
				</>
			) : (
				col.map((row, rIdc) => (
					<>
						<ResizablePanel>check</ResizablePanel>
						<ResizableHandle />
					</>
				))
			)
		) : (
			<></>
		)
	}

	return (
		<div className="min-h-svh grid place-items-center">
			<div className="max-w-screen-xl w-full aspect-video">
				<ResizablePanelGroup direction="horizontal">
					{/* {grid.map((col) => (
						<>{renderItems({ col, path: [] })}</>
					))} */}
				</ResizablePanelGroup>
			</div>
		</div>
	)
}

"use client";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
	title: string;
	subtitle: string;
	value: number;
	onChange: (value: number) => void;
}

interface CounterButtonProps {
	icon: IconType;
	func: () => void;
}
const CounterButton: React.FC<CounterButtonProps> = ({ icon: Icon, func }) => (
	<div
		onClick={func}
		className="
    w-10
    h-10
    rounded-full
    border-[1px]
    border-neutral-400
    flex
    items-center
    justify-center
    text-neutral-600
    cursor-pointer
    hover:opacity-80
    transition"
	>
		<Icon />
	</div>
);

{
	/* <div
onClick={onAdd}
className="
  w-10
  h-10
  rounded-full
  border-[1px]
  border-neutral-400
  flex
  items-center
  justify-center
  text-neutral-600
  cursor-pointer
  hover:opacity-80
  transition"
>
<AiOutlinePlus />
</div> */
}

const Counter: React.FC<CounterProps> = ({
	title,
	subtitle,
	value,
	onChange,
}) => {
	const onAdd = useCallback(() => {
		onChange(value + 1);
	}, [onChange, value]);

	const onReduce = useCallback(() => {
		if (value === 1) return;

		onChange(value - 1);
	}, [onChange, value]);

	return (
		<div
			className="
      flex
      flex-row
      items-center
      justify-between"
		>
			<div className="flex flex-col">
				<div className="font-medium ">{title}</div>
				<div className="font-light text-gray-600">{subtitle}</div>
			</div>
			<div className="flex items-center gap-2">
				<CounterButton icon={AiOutlineMinus} func={onReduce} />
				<div className="font-semibold text-xl text-center text-neutral-600 h-8 w-8">
					{value}
				</div>
				<CounterButton icon={AiOutlinePlus} func={onAdd} />
			</div>
		</div>
	);
};

export default Counter;

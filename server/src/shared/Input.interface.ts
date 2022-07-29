export interface IInput<T, K extends string | number | symbol> {
	input: Omit<T, K>
}

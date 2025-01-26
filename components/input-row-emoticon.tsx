"use client";

import { TableCell, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { ForwardRefRenderFunction, useImperativeHandle, useReducer, memo, forwardRef } from "react";

interface InputRowProps {
  rowData: string[];
};

interface InputRowState {
  encodedKey: string;
  decodedKey: string;
  encodedKey2: string;
  decodedKey2: string;
  encodedValue: string;
  decodedValue: string;
}

export interface InputEmoticonRowHandle {
  getData: () => string[];
}
type Action =
  | { type: "SET_ENCODED_KEY"; payload: string }
  | { type: "SET_DECODED_KEY"; payload: string }
  | { type: "SET_ENCODED_KEY_2"; payload: string }
  | { type: "SET_DECODED_KEY_2"; payload: string }
  | { type: "SET_ENCODED_VALUE"; payload: string }
  | { type: "SET_DECODED_VALUE"; payload: string };

const InputRow: ForwardRefRenderFunction<InputEmoticonRowHandle, InputRowProps>
  = ({ rowData }, ref) => {
    const [state, dispatch] = useReducer(
      (state: InputRowState, action: Action): InputRowState => {
        switch (action.type) {
          case "SET_ENCODED_KEY":
            return { ...state, encodedKey: action.payload }
          case "SET_DECODED_KEY":
            return { ...state, decodedKey: action.payload }

          case "SET_ENCODED_KEY_2":
            return { ...state, encodedKey2: action.payload }
          case "SET_DECODED_KEY_2":
            return { ...state, decodedKey2: action.payload }
          case "SET_ENCODED_VALUE":
            return { ...state, encodedValue: action.payload }
          case "SET_DECODED_VALUE":
            return { ...state, decodedValue: action.payload }
          default:
            return state;
        }
      },
      {
        encodedKey: rowData[0],
        decodedKey: rowData[1],
        encodedKey2: rowData[2],
        decodedKey2: rowData[3],
        encodedValue: rowData[4],
        decodedValue: rowData[5]
      }
    );

    const handleDecodedKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const encodedKey = btoa(unescape(encodeURIComponent(e.target.value)));
      dispatch({ type: "SET_ENCODED_KEY", payload: encodedKey });
      dispatch({ type: "SET_DECODED_KEY", payload: e.target.value });
    };


    const handleDecodedKey2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
      const encodedKey2 = btoa(unescape(encodeURIComponent(e.target.value)));
      dispatch({ type: "SET_ENCODED_KEY_2", payload: encodedKey2 });
      dispatch({ type: "SET_DECODED_KEY_2", payload: e.target.value });
    };

    const handleDecodedValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const encodedValue = btoa(unescape(encodeURIComponent(e.target.value)));
      dispatch({ type: "SET_ENCODED_VALUE", payload: encodedValue });
      dispatch({ type: "SET_DECODED_VALUE", payload: e.target.value });
    };

    useImperativeHandle(ref, () => ({
      getData: () => [
        state.encodedKey,
        state.encodedKey2,
        state.encodedValue,
      ]
    }))

    return (
      <TableRow>
        <TableCell className="truncate max-w-sm">
          <Input type="text" value={state.encodedKey} disabled />
        </TableCell>

        <TableCell className="truncate max-w-sm">
          <Input
            type="text"
            value={state.decodedKey}
            onChange={handleDecodedKeyChange}
          />
        </TableCell>


        <TableCell className="truncate max-w-sm">
          <Input type="text" value={state.encodedKey2} disabled />
        </TableCell>

        <TableCell className="truncate max-w-sm">
          <Input
            type="text"
            value={state.decodedKey2}
            onChange={handleDecodedKey2Change}
          />
        </TableCell>

        <TableCell className="truncate max-w-sm">
          <Input type="text" value={state.encodedValue} disabled />
        </TableCell>

        <TableCell className="truncate max-w-sm">
          <Input
            type="text"
            value={state.decodedValue}
            onChange={handleDecodedValueChange}
          />
        </TableCell>
      </TableRow>
    );
  }

export default memo(forwardRef(InputRow));

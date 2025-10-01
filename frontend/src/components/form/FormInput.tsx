import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
export const FormInput = ({
  name,
  label,
  placeholder,
  type = "text",
  className,
  onBlur,
  onChange,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              type={type}
              // onBlur={onBlur}
              // onChange={onChange}
               onBlur={(e) => {
                field.onBlur(); // keep RHF tracking
                onBlur?.(e);
              }}
              onChange={(e) => {
                field.onChange(e); // keep RHF state
                onChange?.(e);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

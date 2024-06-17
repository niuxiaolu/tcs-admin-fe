"use client";
import {
  createElement,
  ComponentClass,
  FunctionComponent,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Form, Field } from "react-final-form";

interface FormItemDescribe {
  label?: string;
  props?: any;
  children?: Array<FormItemDescribe>;
  name: string;
  required?: boolean;
  component: FunctionComponent | ComponentClass | string;
}

type CustomRequired<T, K extends keyof T> = {
  [P in K]-?: T[P];
} & Omit<T, K>;

type FormItemDescribeRequired = CustomRequired<
  FormItemDescribe,
  "name" | "component"
>;

function FormDropdown({ optionsFunction, run, ...props }: any) {
  // TODO 考虑是否需要放进来，还是就在业务页面完成
  const [options, setOptions] = useState([]);

  const memoAsync = useMemo(() => {
    return (next: (data: any) => void) => {
      optionsFunction(next);
    };
  }, [run]);

  useEffect(() => {
    const p = new Promise((resolve, reject) => {
      if (typeof optionsFunction !== "function") {
        resolve(props.options || []);
      }
      if (run) memoAsync(resolve);
    });
    p.then((data: any) => {
      setOptions(data);
    });
  }, [memoAsync, run]);

  return <Dropdown options={options} {...props} />;
}

function FormItem(describe: FormItemDescribeRequired) {
  const { label, component, props, children = [], name, required } = describe;

  const isFormFieldValid = (meta: any) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta: any) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  return (
    <Field
      name={name}
      render={({ input, meta }) => {
        return (
          <div className="flex flex-column" style={{ gap: ".5rem" }}>
            <label htmlFor={label}>
              {required && (
                <span
                  style={{
                    color: "red",
                  }}
                >
                  *
                </span>
              )}
              {label}
            </label>
            {createElement(
              component,
              {
                ...props,
                ...input,
              },
              children.map((desc) => FormItem(desc))
            )}
            <span>{getFormErrorMessage(meta)}</span>
          </div>
        );
      }}
    ></Field>
  );
}

function FormContent({ handleSubmit }: any) {
  const test = (next: any) => {
    setTimeout(() => {
      next([
        {
          name: "New York",
          code: "NY",
        },
      ]);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormItem name="orderID" component={InputText} label="Order ID" />
      <FormItem
        name="clientOrderID"
        component={InputText}
        label="Client Order ID"
      />
      <FormItem
        required
        name="orderStatus"
        component={InputText}
        label="Order Status"
        props={{
          disabled: true,
          variant: "filled",
        }}
      />
      <FormItem
        required
        name="orderQuantity"
        component={InputText}
        label="Order Quantity"
      />
      <FormItem
        required
        name="side"
        component={FormDropdown}
        label="Side"
        props={{
          optionLabel: "name",
          optionsFunction: test, //getFetch
          run: true,
        }}
      />
      <FormItem
        required
        name="orderType"
        component={FormDropdown}
        label="Order Type"
        props={{
          optionLabel: "name",
          options: [
            {
              name: "New York",
              code: "NY",
            },
          ],
        }}
      />

      <Button type="submit" label="Create" className="mt-2" />
      <Button label="Cancel" className="mt-2" />
    </form>
  );
}

/** 内部使用，不导出 */
// const FormRender = ({ form, instance, ...props }: FormRenderProps) => {
const FormRender = ({ form, instance, ...props }: any) => {
  useEffect(() => {
    instance.current = form;
    return () => {
      instance.current = null;
    };
  }, [instance]);

  return <FormContent {...props} />;
};

const useForm = (Content: FunctionComponent | ComponentClass): any => {
  const _form = useRef(null);
  const render = useMemo(() => {
    return function Form({ form, ...props }: any) {
      useEffect(() => {
        _form.current = form;
        debugger;
      }, []);
      return <Content {...props} />;
    };
  }, [Content]);
  return [_form, render];
};

/** Page */
export default function OperatingOrder() {
  //   // const [action, setAction] = useState(null)
  //   const formInstance = useRef(null);
  //   const onSubmit = (data, form) => {
  //     debugger;
  //   };

  //   const validate = (data) => {
  //     let errors = {};

  //     if (data.orderID && data.orderID.length > 25) {
  //       errors.orderID = "no longer than 255 characters ";
  //     }
  //     if (data.clientOrderID && data.clientOrderID.length > 25) {
  //       errors.clientOrderID = "no longer than 255 characters ";
  //     }

  //     return errors;
  //   };

  //   //   编辑回显
  //   //   useEffect(() => {
  //   //     formInstance.current.restart()
  //   //   }, [])

  //   return (
  //     <>
  //       <Form
  //         instance={formInstance} //自定义的
  //         onSubmit={onSubmit}
  //         validate={validate}
  //         // render={FormRender}
  //       ></Form>
  //     </>
  //   );

  const [instance, render] = useForm(FormContent as any);
  const onSubmit = (data: any, form: any) => {
    debugger;
  };
  const validate = (data: any) => {
    let errors: { [k: string]: string } = {};

    if (data.orderID && data.orderID.length > 25) {
      errors.orderID = "no longer than 255 characters ";
    }
    if (data.clientOrderID && data.clientOrderID.length > 25) {
      errors.clientOrderID = "no longer than 255 characters ";
    }

    return errors;
  };

  //   编辑回显
  useEffect(() => {
    console.log(instance);
  }, []);

  return (
    <>
      <Form onSubmit={onSubmit} validate={validate} render={render}></Form>
    </>
  );
}

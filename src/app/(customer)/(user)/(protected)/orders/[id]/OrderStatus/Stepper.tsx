import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from "@/components/ui/stepper";
import { type OrderStatus } from "@/../amplify/types";

const steps = [
  {
    step: 1,
    title: "Step One One",
    description: "Desc for step one",
  },
  {
    step: 2,
    title: "Step Two",
    description: "Desc for step two",
  },
  {
    step: 3,
    title: "Step Three",
    description: "Desc for step three",
  },
  {
    step: 4,
    title: "Step Four",
    description: "Desc for step four",
  },
];

const getStepLabel = (step: OrderStatus) => {
  switch (step) {
    case "PENDING":
      return 1;
    case "PREPARING":
      return 2;
    case "READY":
      return 3;
    case "COMPLETED":
      return 4;
  }
};

export default function StatusStepper({ status }: { status: OrderStatus }) {
  return (
    <Stepper defaultValue={getStepLabel(status)}>
      {steps.map(({ step, title }) => (
        <StepperItem
          key={step}
          step={step}
          className="relative flex-1 flex-col!"
        >
          <div className="flex flex-col items-center gap-3 rounded">
            <StepperIndicator />
            <div className="space-y-0.5 px-2 text-center">
              <StepperTitle>{title}</StepperTitle>
            </div>
          </div>
          {step < steps.length && (
            <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
          )}
        </StepperItem>
      ))}
    </Stepper>
  );
}

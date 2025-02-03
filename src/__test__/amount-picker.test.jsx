import { render, screen } from "@testing-library/react";
import AmountPicker from "../components/cart/AmountPicker";
import { useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../redux/cartSlice";
import userEvent from "@testing-library/user-event";
import { mockItem } from "../constants";

// useDispatch metodunu mockla
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("Amount Picker", () => {
  const item = {
    name: "Çikolata Fırtınası",
    image: "/ice-2png",
    price: 20,
    id: "d21b",
    selectedType: "cornet",
    quantity: 2,
  };
  // use dispath'in döndürdüğü methodu mockla
  const dispatchMock = jest.fn();

  beforeEach(() => {
    // useDispatch çağrılınca geriye sahte dispatch methodunu döndürsün
    useDispatch.mockReturnValue(dispatchMock);

    // her testten önce mocku sıfırla
    dispatchMock.mockClear();
  });

  it("miktar değeri doğrudur", () => {
    render(<AmountPicker item={item} />);
    screen.getByText("2");
  });

  it("- butonuna tıklanınca doğru aksiyon tetiklenir", async () => {
    const user = userEvent.setup();
    render(<AmountPicker item={item} />);
    const btn = screen.getByRole("button", { name: "-" });
    await user.click(btn);
    expect(dispatchMock).toHaveBeenCalledWith(deleteFromCart(item));
  });

  it("+ butonuna tıklanınca doğru aksiyon tetiklenir", async () => {
    const user = userEvent.setup();
    render(<AmountPicker item={item} />);
    const btn = screen.getByRole("button", { name: "+" });
    await user.click(btn);
    expect(dispatchMock).toHaveBeenCalledWith(
      addToCart({ item: item, selectedType: item.selectedType })
    );
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import api from "../api";
import List from "../components/list";
import Card from "../components/card";
import { mockArray } from '../constants';

// api modülünü mockla
jest.mock("../api");

// card bileşeni kendi içinde provide / browser router gibi bağımlılıkları kullandığından ve bu bağımlılıkların list bileşeninin testine etki etmesini istemediğimizden card bileşenini mockla
jest.mock("../components/card");

describe("List bileşeni testleri", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("veri çekilirken ekranda loader vardır", async () => {
    // api isteği atılınca gönderilcek cevabı
    api.get.mockResolvedValueOnce({ data: [] });

    // list bileşenini renderla
    render(<List />);

    // ekranda loader vardır
    screen.getByTestId("loader");

    // belirli bir süre sonra loader ekrandan gider
    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });
  });

  it("api'da error cevabı gelirse ekrana hata mesajı gelir", async () => {
    // api isteği atılınca hatalı error vermeli
    const errMsg = "Üzgünüz bir sorun oluştu";
    api.get.mockRejectedValueOnce(new Error(errMsg));

    // bileşeni renderla
    render(<List />);

    // api'dan cevap gelince ekrana hata mesajı gelir
    await waitFor(() => screen.getByText(errMsg));
  });

  it("api'da başarılı cevap gelirse ekrana card'lar gelir", async () => {
    // card bileşeni çağrıldığında şunu döndür
    Card.mockImplementation(({ item }) => <div>{item.name}</div>);

    // api isteği atılınca olumlu cevap döndür
    api.get.mockResolvedValueOnce({ data: mockArray });

    // bileşeni renderla
    render(<List />);

    await waitFor(() => {
      // veri gelince her bir nesne için ekrana card gelir
      mockArray.forEach((item) => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
      });
    });
  });
});

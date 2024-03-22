
export interface IBooksData {
    books: IBook[]
  }
  

  
export interface IBook {
    id: string,
    author: string,
    volumeInfo: {
      title: string;
      subtitle: string;
      authors: [
        string
      ];
      publishedDate: string;
      description: string;
      pageCount: number;
      categories: [
        string,
      ];
      averageRating: number;
      ratingCount: number;
      imageLinks: {
        "smallThumbmail" : string;
        "thumbnail": string;
      };
      language: string;
      previewLink: string
  
    }
  
  }
  

export interface addBooktoDBProps {
  title: string;
  author: string;
  coverImgUrl: string;
  category: string;
  description: string;
  bookId: string;
  userId: string | undefined;
  // status: "READING" | "TOREAD" | "READ";
  totalPages: number;
}
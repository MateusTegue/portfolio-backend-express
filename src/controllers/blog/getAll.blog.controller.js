import getAllBlog from "../../repository/blog/getAll.blog.repository.js";


const getAllBlogController = async (req, res) => {
    try {
        await getAllBlog(req, res);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener los blogs", error });
    }
}

export default getAllBlogController;
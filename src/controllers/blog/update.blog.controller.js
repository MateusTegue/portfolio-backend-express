import updateBlog from "../../repository/blog/update.blog.repository.js";


const updateBlogController = async (req, res) => {
    try {
        await updateBlog(req, res);
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar el blog", error });
    }
}

export default updateBlogController;
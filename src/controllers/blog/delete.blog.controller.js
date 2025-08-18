import deleteBlog from "../../repository/blog/delete.blog.repository.js";


const deleteBlogController = async (req, res) => {
    try {
        await deleteBlog(req.params.id);
        res.status(200).json({ msg: "Blog eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar el blog", error });
    }
}


export default deleteBlogController;
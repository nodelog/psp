/**   
 * @Title: ProblemAction.java
 * @Package com.psp.web.action.user
 * @Description: TODO
 * @author wangyachao 
 * @date 2014-4-19 下午5:58:05
 * @version V1.0   
 */

package com.psp.web.action.user;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.net.ftp.FTPClient;

import com.opensymphony.xwork2.ModelDriven;
import com.psp.service.FileService;
import com.psp.service.ProblemService;
import com.psp.util.FinalUtil;
import com.psp.util.FtpUpload;
import com.psp.util.Page;
import com.psp.web.action.BaseAction;
import com.psp.web.domain.Answer;
import com.psp.web.domain.Category;
import com.psp.web.domain.File;
import com.psp.web.domain.Problem;
import com.psp.web.domain.User;

/**
 * 问答action
 * 
 * @author wangyachao
 * @date 2014-4-19 下午5:58:05
 * @version V1.0
 */
public class ProblemAction extends BaseAction implements ModelDriven<Problem> {
    private static final long serialVersionUID = -7722179858401272003L;
    private ProblemService problemService;
    private FileService fileService;
    private FtpUpload ftpUpload;
    private Problem problem;
    private Integer categoryId;
    private Integer currentPage;
    private java.io.File image;
    private String filename;
    private Integer imageId;
    private String target;
    private String answerText;
    private Integer answerId;
    private String requestType;

    public void setFtpUpload(FtpUpload ftpUpload) {
        this.ftpUpload = ftpUpload;
    }

    public void setFileService(FileService fileService) {
        this.fileService = fileService;
    }

    public void setProblemService(ProblemService problemService) {
        this.problemService = problemService;
    }

    public String loadHotProblem() {
        List<Problem> hotProblem = problemService.getHotProblem();
        List<Problem> hotProblemList = new ArrayList<Problem>();
        for (Problem problem : hotProblem) {
            Problem minproblem = new Problem();
            minproblem.setId(problem.getId());
            minproblem.setTitle(problem.getTitle());
            List<Answer> answers = problemService.findAnswerList(problem);
            for (Answer answer : answers) {
                if (answer != null && answer.getStatus() == 2) {
                    Answer answerMin = new Answer();
                    answerMin.setContent(answer.getContent());
                    answerMin.setUser(new User(answer.getUser().getId(), answer
                            .getUser().getName()));
                    answerMin.setCreateTime(answer.getCreateTime());
                    List<Answer> answerList = new ArrayList<Answer>();
                    answerList.add(answerMin);
                    minproblem.setAnswers(answerList);
                    break;
                }
            }
            hotProblemList.add(minproblem);
        }
        dataMap.put("hotProblem", hotProblemList);

        return SUCCESS;

    }

    public String loadHotPic() {
        List<File> problemPicList = fileService
                .getFileByApp(FinalUtil.PROBLEM_CODE);
        dataMap.put("problemPicList", problemPicList);
        return SUCCESS;

    }

    /**
     * 统计出解决和未解决的问题数量
     * 
     * @author wangyachao
     * @return String   
     * @throws 
     */
    public String countProblem() {
        Map<String, Integer> countMap = problemService.countProblem();
        dataMap.put("countProblem", countMap);
        return SUCCESS;

    }

    public String countUserQA() {
        // User user = (User) session.get("user");
        Map<String, Integer> myProblemCount = problemService
                .countUserQA(getSessionUser());
        dataMap.put("myProblemCount", myProblemCount);
        return SUCCESS;
    }

    public String addProblem() {
        problem.setCreateTime(new Timestamp(System.currentTimeMillis()));
        problem.setStatus(FinalUtil.PROBLEM_UNRESOLVED);
        problem.setUser((User) session.get("user"));
        problem.setCategory(new Category(categoryId));
        String title = problem.getTitle();
        if (title.length() > 32) {
            problem.setTitle(title.substring(0, 32));
        }
        Integer id = problemService.addProblem(problem);
        if (imageId != null) {
            fileService.updateFileAppId(imageId, id);
        }
        dataMap.put("problemId", id);
        return SUCCESS;

    }

    public String loadNewProblem() {
        List<Problem> newProblem = problemService.getNewProblem();
        List<Problem> minProblemList = minProblem(newProblem);
        dataMap.put("newProblem", minProblemList);
        return SUCCESS;

    }

    private List<Problem> minProblem(List<Problem> problems) {
        List<Problem> minProblemList = new ArrayList<Problem>();
        for (Problem problem : problems) {
            Problem minProblem = new Problem();
            minProblem.setId(problem.getId());
            minProblem.setTitle(problem.getTitle());
            minProblem.setScore(problem.getScore());
            minProblem.setCreateTime(problem.getCreateTime());
            List<Answer> answers = problemService.findAnswerList(problem);
            List<Answer> minAnswerList = new ArrayList<Answer>();
            for (Answer answer : answers) {
                if (answer != null) {
                    Answer minAnswer = new Answer();
                    minAnswer.setId(answer.getId());
                    minAnswerList.add(minAnswer);
                }
            }
            minProblem.setAnswers(minAnswerList);
            minProblemList.add(minProblem);
        }
        return minProblemList;
    }

    public String loadProblemByType() {
        Category category = new Category();
        category.setId(categoryId);
        Page page = new Page();
        page.setCurrent(currentPage);
        List<Problem> problems = problemService.findProblemByCategory(category,
                page);
        List<Problem> minProblemList = minProblem(problems);
        dataMap.put("typeProblem", minProblemList);
        return SUCCESS;
    }

    public String loadProblemByUser() {
        User user = (User) session.get("user");
        Page page = new Page();
        page.setCurrent(currentPage);
        List<Problem> problems = problemService.findProblemByUser(user, page);
        List<Problem> minProblemList = minProblem(problems);
        dataMap.put("myProblem", minProblemList);
        request.put("myProblem", problems);
        return render("myProblem");
    }

    public String loadProblemByAnswer() {
        User user = (User) session.get("user");
        Page page = new Page();
        page.setCurrent(currentPage);
        List<Problem> problems = problemService.findProblemByAnser(user, page);
        List<Problem> minProblemList = minProblem(problems);
        dataMap.put("myAnswer", minProblemList);
        request.put("myAnswer", problems);
        return render("myAnswer");
    }

    public String loadCountByType() {
        Page page = new Page();
        Integer pageTotal = problemService.getPageTotal(page, categoryId);
        dataMap.put("pageTotal", pageTotal);
        return SUCCESS;
    }

    public String loadCountByUser() {
        Page page = new Page();
        User user = (User) session.get("user");
        Integer pageTotal = problemService.getPageTotal(page, user);
        dataMap.put("pageTotal", pageTotal);
        return SUCCESS;
    }

    public String loadCountByAnswer() {
        Page page = new Page();
        User user = (User) session.get("user");
        Integer pageTotal = problemService.getPageTotalByUser(page, user);
        dataMap.put("pageTotal", pageTotal);
        return SUCCESS;
    }

    public String upload() {
        String path = FinalUtil.FTP_SERVER_URL + FinalUtil.PROBLEM_DIR;
        File imageFile = new File();
        imageFile.setApp(FinalUtil.PROBLEM_CODE);
        imageFile.setName(filename);
        imageFile.setSize(getFileSize(image));
        imageFile.setTime(new Timestamp(System.currentTimeMillis()));
        imageFile.setStatus(FinalUtil.FILE_NORMAL);
        filename = buildNewFileName(filename);
        imageFile.setUrl(FinalUtil.PROBLEM_DIR + "/" + filename);
        File uploadFile = fileService.uploadFile(imageFile);
        dataMap.put("imageFile", uploadFile);
        ftpUpload.uploadFile(path, filename, image, FTPClient.BINARY_FILE_TYPE);
        return SUCCESS;
    }

    public String findProblemById() {
        Problem problemDetial = problemService.findProblemById(problem.getId());
        if (problemDetial == null) {
            return render("404");
        }
        List<Answer> answers = problemService.findAnswerList(problem);
        problemDetial.setAnswers(answers);
        List<File> problemImage = fileService.getFileByApp(
                FinalUtil.PROBLEM_CODE, problemDetial.getId());
        request.put("problemDetial", problemDetial);
        if (problemImage != null && problemImage.size() > 0) {
            request.put("problemImage", problemImage.get(0));
        }
        if (FinalUtil.JSON.equals(requestType)) {
            dataMap.put("problemTitle", problemDetial.getTitle());
            return SUCCESS;
        }
        return render("problemDetial");
    }

    public String addAnswer() {
        if (answerText == null) {
            dataMap.put("result", FinalUtil.ERROR);
            return SUCCESS;
        }
        Answer answer = new Answer();
        answer.setProblem(problem);
        User user = (User) session.get("user");
        answer.setUser(user);
        answer.setCreateTime(new Timestamp(System.currentTimeMillis()));
        answer.setStatus(FinalUtil.ANSWER_UNBEST);
        answer.setContent(answerText);
        problemService.addAnswer(answer);
        dataMap.put("result", FinalUtil.SUCCESS);
        return SUCCESS;
    }

    public String bestAnswer() {
        if (answerId == null) {
            dataMap.put("result", FinalUtil.ERROR);
            return SUCCESS;
        }
        Answer answer = new Answer();
        answer.setId(answerId);
        answer.setProblem(problem);
        problemService.updateAnswer(answer);
        dataMap.put("result", FinalUtil.SUCCESS);
        return SUCCESS;
    }

    public Problem getModel() {
        if (problem == null) {
            problem = new Problem();
        }
        return problem;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public Integer getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    public Integer getImageId() {
        return imageId;
    }

    public void setImageId(Integer imageId) {
        this.imageId = imageId;
    }

    public java.io.File getImage() {
        return image;
    }

    public void setImage(java.io.File image) {
        this.image = image;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {

        this.filename = filename;
    }

    // public String buildNewFileName(String filename){
    // int index = filename.indexOf('.');
    // StringBuffer stringBuffer = new StringBuffer();
    // stringBuffer.append(filename.substring(0, index));
    // stringBuffer.append(FinalUtil.DELIMITER);
    // stringBuffer.append(System.currentTimeMillis());
    // stringBuffer.append(filename.substring(index));
    // return stringBuffer.toString();
    // }

    public String render(String target) {
        this.target = target;
        if ("404".equals(target)) {
            return FinalUtil.NOT_FOUND;
        }
        return SUCCESS;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public String getAnswerText() {
        return answerText;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }

    public Integer getAnswerId() {
        return answerId;
    }

    public void setAnswerId(Integer answerId) {
        this.answerId = answerId;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

}
